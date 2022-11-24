package service;


import DB.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.JWTVerifier;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import kong.unirest.Unirest;

@Path("campusnet")
public class CampusNetLogin {

    @GET
    @Path("login")
    public Response login(){
        String URI = "https://auth.dtu.dk/dtu/?service=http://localhost:8080/api/campusnet/redirect";
        return Response.seeOther(UriBuilder.fromUri(URI).build()).build();
    }
    @GET
    @Path("redirect")
    public String callback(@QueryParam("ticket") String cnTicket) throws NotAuthorizedException{
        System.out.println(cnTicket); //Check if we got something back
        //Tjek ticket mod CampusNet
        String body = Unirest.get( "https://auth.dtu.dk/dtu/validate?service=http://localhost:8080/api/campusnet/redirect&ticket="
                        + cnTicket)
                .asString()
                .getBody();

        //TODO Should create user og check if they exist
        if (body.contains("yes")) {
            String tokenString = JWTHandler.generateJwtToken(new User());
            return tokenString;
        }
        throw new NotAuthorizedException("Login failed");
    }
}




