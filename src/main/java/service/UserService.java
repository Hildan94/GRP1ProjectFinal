package service;

import DB.HibernateController;
import DB.User;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.criteria.JpaCriteriaQuery;
import org.mindrot.jbcrypt.BCrypt;
import service.exceptions.NoImplementationException;

import java.util.ArrayList;
import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Path("users")

//TODO: Need to handle validation exceptions
//TODO: Figure out how JWTHandler works
public class UserService {

    List<User> users = new ArrayList<>();
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg").getSessionFactory();
    @POST
    public int createUser(User user, @HeaderParam("Authorization") String token){
        User validated = JWTHandler.validate(token);
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        String hash = BCrypt.hashpw(user.getPassword(),BCrypt.gensalt());
        user.setHash(hash);
        session.persist(user);
        transaction.commit();

        return user.getId();
    }


    //TODO: Finish this
    @GET
        public List<User> getUsers (@HeaderParam("Authorization") String authHeader){
            System.out.println(authHeader + " Something");
            User user = JWTHandler.validate(authHeader);
            System.out.println("User accessing users: " + user);


            Session session = sessionFactory.openSession();
            JpaCriteriaQuery<User> query = session.getCriteriaBuilder().createQuery(User.class);
            query.from(User.class);
            List<User> users = session.createQuery(query).getResultList();


            return users; //TODO implement some users…


        }

    @GET
    @Path("query")
    public List<User> queryUsers(@QueryParam("name") String name) throws NoImplementationException {
        //No implementation yet
        throw new NoImplementationException("user-queries not implemented yet");
    }
}


