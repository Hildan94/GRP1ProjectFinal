package service;

import DB.HibernateController;
import DB.User;
import DB.LoginData;
import io.prometheus.client.Counter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import lombok.extern.log4j.Log4j2;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.criteria.JpaCriteriaQuery;
import org.mindrot.jbcrypt.BCrypt;
import service.exceptions.NotAuthorizedException;
import java.util.List;


@Path("login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Log4j2
public class LoginService {
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg").getSessionFactory();

    public final static Counter attemptCounter = Counter.build().name("loginAttempts").help("Total login Attemts").register();
    public final static Counter failCounter = Counter.build().name("loginFails").help("Total Faileed Attempts").register();

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
        }
        log.info("Failed login" + login.getUsername());
        throw new NotAuthorizedException("forkert brugernavn/kodeord");
    }

    @POST
    @Path("tokentest")
    public User postToken(@HeaderParam("Authorization") String token){
        System.out.println("Endpoint tokentest hit");
        User validate = JWTHandler.validate(token);
        return  validate;
    }
}

