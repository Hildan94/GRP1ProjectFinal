package Filters;


import jakarta.annotation.Priority;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;

@Provider
@Priority(1000) //For at CORS filter bliver kørt først
public class AuthFilter implements ContainerRequestFilter {


    /**
     * /Todo: Implement this
     *  https://www.baeldung.com/jersey-filters-interceptors
     */

    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {
        System.out.println(containerRequestContext.getUriInfo().getPath());
        if (!"login".equals(containerRequestContext.getUriInfo().getPath())) {
            System.out.println(containerRequestContext.getHeaderString("Authorization"));
            //Authorize the request!
        }
    }
}

