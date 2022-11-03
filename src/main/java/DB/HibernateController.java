package DB;



public class HibernateController {//Should be a singleton…
    private final SessionFactory sessionFactory;

    public HibernateController(String dbUrl){
        SeBootstrap.Configuration configuration = new Configuration(); //NB org.hibernate.cfg.Configuration
        configuration.addAnnotatedClass(User.class); //remember to do this for all DB entities
        configuration.setProperty("hibernate.connection.username",System.getenv("devopse22user"));
        configuration.setProperty("hibernate.connection.password",System.getenv("devopse22pass"));
        configuration.setProperty("hibernate.connection.url", "jdbc:postgresql://" + dbUrl);
        configuration.setProperty("hibernate.hbm2ddl.auto","update"); //update Schema - don't do this in prod
        this.sessionFactory = configuration.buildSessionFactory();
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
