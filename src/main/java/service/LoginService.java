package service;

import DB.HibernateController;
import DB.User;
import DB.LoginData;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.java.Log;
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

    @POST
    public String postLoginData(LoginData login) throws NotAuthorizedException {

        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<User> query = session.getCriteriaBuilder().createQuery(User.class);
        query.from(User.class);
        List<User> users = session.createQuery(query).getResultList();

        for(User user : users){
            if (login.getUsername().equals(user.getUsername()) && BCrypt.checkpw(login.getPassword(),user.getHash())){
                return JWTHandler.generateJwtToken(user);
            }
        }throw new NotAuthorizedException("forkert brugernavn/kodeord");
    }

    @POST
    @Path("tokentest")
    public User postToken(@HeaderParam("Authorization") String token){
        User validate = JWTHandler.validate(token);
        return  validate;
    }
}

