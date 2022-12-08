package Filters;


import jakarta.annotation.Priority;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.log4j.Log4j2;
import service.JWTHandler;

import java.io.IOException;

import static jakarta.ws.rs.core.Response.Status.UNAUTHORIZED;

@Provider
@Priority(1000) //For at CORS filter bliver kørt først
@Log4j2
public class AuthFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {
        System.out.println(containerRequestContext.getUriInfo().getPath());
        if (!"login".contains(containerRequestContext.getUriInfo().getPath())) {
            var token = containerRequestContext.getHeaderString("Authorization");
            log.error("Token: " + token);
            if (token != null) {
                if (!JWTHandler.loginValidate(token)) {
                    log.error("Not authorized");
                    containerRequestContext.abortWith(Response.status(UNAUTHORIZED).build());
                } else {
                    log.info("authorized");
                }
            } else {
                log.error("Not authorized");
                containerRequestContext.abortWith(Response.status(UNAUTHORIZED).build());
            }
        }
    }
}

