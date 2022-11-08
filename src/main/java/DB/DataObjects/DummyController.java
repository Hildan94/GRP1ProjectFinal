package DB.DataObjects;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class DummyController {//Should be a singleton…
    private final SessionFactory sessionFactory;

    public DummyController(){
        Configuration configuration = new Configuration(); //NB org.hibernate.cfg.Configuration
        configuration.addAnnotatedClass(Report.class); //remember to do this for all DB entities
        configuration.setProperty("hibernate.connection.username",System.getenv("devopse22user"));
        configuration.setProperty("hibernate.connection.password",System.getenv("devopse22pass"));
        configuration.setProperty("hibernate.connection.url", "http://localhost:8080/api/reports");
        configuration.setProperty("hibernate.hbm2ddl.auto","update"); //update Schema - don't do this in prod
        this.sessionFactory = configuration.buildSessionFactory();
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
