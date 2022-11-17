package service;

import DB.User;
import DB.LoginData;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.mindrot.jbcrypt.BCrypt;
import service.exceptions.NotAuthorizedException;

@Path("login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginService {

    //TODO: Needs validate user from DB
    @POST
    public String postLoginData(LoginData login) throws NotAuthorizedException {

        String hashed = BCrypt.hashpw(login.getPassword(),BCrypt.gensalt());

        if (BCrypt.checkpw(login.getPassword(),hashed)){
            System.out.println("It matches");
        }else
            System.out.println("It doesnt match");


        if (login != null && "brian".equals(login.getUsername()) && "kodeord".equals(login.getPassword())){
            return JWTHandler.generateJwtToken(new User(login.getUsername(), ""));
        }
        throw new NotAuthorizedException("forkert brugernavn/kodeord");
    }

    @POST
    @Path("tokentest")
    public User postToken(String token){
        User validate = JWTHandler.validate(token);
        return  validate;
    }

    /*
public class NotAuthorizedException extends Throwable {
    public NotAuthorizedException(String s) {
        super((s));
    }
}

@Provider
public class NotAuthorizedExceptionMapper implements ExceptionMapper<NotAuthorizedException> {

    @Override
    public Response toResponse(NotAuthorizedException e) {
        return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
    }
}

 */


}

