package service;


import DB.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.JWTVerifier;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import kong.unirest.Unirest;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Path("campusnet")
public class CampusNetLogin {

    @GET
    @Path("login")
    public Response login(){
        String URI = "https://auth.dtu.dk/dtu/?service=https://nem.grp1.diplomportal.dk:443/api/campusnet/redirect";
        return Response.seeOther(UriBuilder.fromUri(URI).build()).build();
    }
    //TODO: Should assign right userId to token when loggin in through campusnet and is existing in DB
    //TODO: Why no work with console.log?
    @GET
    @Path("redirect")
    public Response callback(@QueryParam("ticket") String cnTicket) throws NotAuthorizedException{
        System.out.println(cnTicket); //Check if we got something back
        //Tjek ticket mod CampusNet
        String body = Unirest.get( "https://auth.dtu.dk/dtu/validate?service=https://nem.grp1.diplomportal.dk:443/api/campusnet/redirect&ticket="
                        + cnTicket)
                .asString()
                .getBody();

        if (body.contains("yes")) {
            User user = new User();
            user.setUsername(extractUserName(body));
            UserService service = new UserService();
            User userInDB = service.userInDB(user.getUsername());

            if(userInDB != null && user.getUsername().equals(userInDB.getUsername())){
                user.setId(userInDB.getId());
                System.out.println("User with ID " + user.getId() + " Logged in from CNet");
            }else {
                service.createInternalUser(user);
                System.out.println("Created new user from CNet");
            }
            /*
            if(!service.userInDB(user.getUsername())) {
                service.createInternalUser(user);
            }
             */
            String tokenString = JWTHandler.generateJwtToken(user);
            return Response.seeOther(UriBuilder.fromUri("https://nem.grp1.diplomportal.dk:443/?token="+ tokenString).build()).build();
        }
        throw new NotAuthorizedException("Login failed");
    }

    private String extractUserName(String response) {
        String[] responseSplit = response.split("\\r?\\n");
        return responseSplit[responseSplit.length - 1];
    }
}




