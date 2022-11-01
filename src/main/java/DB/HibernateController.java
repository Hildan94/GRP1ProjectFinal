package DB;


import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateController {//Should be a singleton…
    private final SessionFactory sessionFactory;

    public HibernateController(String dbUrl){
        Configuration configuration = new Configuration(); //NB org.hibernate.cfg.Configuration
        configuration.addAnnotatedClass(User.class); //remember to do this for all DB entities
        configuration.setProperty("hibernate.connection.username","pg");
        configuration.setProperty("hibernate.connection.password", "889226e9a74ce148");
        configuration.setProperty("hibernate.connection.url", "jdbc:postgresql://" + dbUrl);
        configuration.setProperty("hibernate.hbm2ddl.auto","update"); //update Schema - don't do this in prod
        this.sessionFactory = configuration.buildSessionFactory();
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
