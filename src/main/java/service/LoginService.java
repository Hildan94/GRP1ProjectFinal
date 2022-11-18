package service;

import DB.HibernateController;
import DB.User;
import DB.LoginData;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.criteria.JpaCriteriaQuery;
import org.mindrot.jbcrypt.BCrypt;
import service.exceptions.NotAuthorizedException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Path("login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginService {
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg").getSessionFactory();

    //TODO: Needs validate user from DB
    //TODO: For some reason kan jeg ikke få kodeordene til at matche..
    @POST
    public String postLoginData(LoginData login) throws NotAuthorizedException {


        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<User> query = session.getCriteriaBuilder().createQuery(User.class);
        query.from(User.class);
        List<User> users = session.createQuery(query).getResultList();

        for(User user : users){
            //TODO: Indsæt check for kodeord og brugernavn her
        }

        if (login != null && "brian".equals(login.getUsername()) && "kodeord".equals(login.getPassword())){
            return JWTHandler.generateJwtToken(new User(login.getUsername(), ""));
        }
        throw new NotAuthorizedException("forkert brugernavn/kodeord");
    }

    @POST
    @Path("tokentest")
    public User postToken(@HeaderParam("Authorization") String token){
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

