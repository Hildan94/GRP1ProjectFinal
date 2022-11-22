package service;


//TODO: Skal kunne generere en rapport når en quiz er gennemført

import DB.HibernateController;
import DB.Report;
import DB.User;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.apache.catalina.filters.ExpiresFilter;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.*;

@Produces(MediaType.APPLICATION_JSON)
@Path("reports")
public class ReportService {
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg").getSessionFactory();

    @POST
    public void createReport(Report report, @HeaderParam("Authorization") String token){
        User validated = JWTHandler.validate(token);
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.persist(report);
        transaction.commit();

    }

    @GET
    public List<Report> reports(@HeaderParam("Authorization") String token){
        User user = JWTHandler.validate(token);

        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();

        List reports = session.createQuery("FROM Report").list();

        for (Iterator iterator = reports.iterator(); iterator.hasNext(); ) {
            Report report = (Report) iterator.next();
            System.out.println(report);
        }
        return reports;
    }

    @Path("report")
    @GET
    public Report report (@QueryParam("id") int Id){
        Report report = new Report();
        System.out.println(Id);
        return report;
    }

}
