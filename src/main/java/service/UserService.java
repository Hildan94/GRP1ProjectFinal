package service;

import DB.HibernateController;
import DB.User;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.criteria.JpaCriteriaQuery;

import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Path("users")
public class UserService {
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.4a4b.dk:6543/pg").getSessionFactory();

    @POST
    public int createUser(User user){
        Session session = sessionFactory.openSession();
        session.persist(user);
        return user.getId();
    }
    @GET
    public List<User> getUsers(){
        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<User> query = session.getCriteriaBuilder().createQuery(User.class);
        query.from(User.class);
        List<User> data = session.createQuery(query).getResultList();
        return data;
    }
}

