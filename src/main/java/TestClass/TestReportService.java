package TestClass;

import DB.HibernateController;
import DB.Report;
import DB.User;
import com.fasterxml.jackson.core.JsonParser;
import jakarta.ws.rs.POST;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.testng.annotations.Test;
import service.JWTHandler;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.util.Iterator;
import java.util.List;

public class TestReportService {
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg").getSessionFactory();


    /**
     * Doesnt work
     * TODO: FIX
     */
    @Test
    public void testCreateReportHTTP(){
        Transaction transaction = sessionFactory.openSession().beginTransaction();
        User user = new User();
        String token = JWTHandler.generateJwtToken(user);
        System.out.println(token);
        JWTHandler.validate(token);

        System.out.println(JWTHandler.validate(token));

    }


    //TODO: Finish this
    @Test
    public void testCreateReport(){
        /*
        HibernateController hibernateController =

                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        */
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Report report = new Report();
        System.out.println("QuizId before commit: " + report.getId());
        report.setUserId("Melman");
        session.persist(report);
        transaction.commit();
        System.out.println("QuizID after commit: " + report.getUserId());
        Transaction readTransaction = session.beginTransaction();
        Report readReport = session.get(Report.class, report.getId());
        System.out.println("Read user back: " + readReport.toString());
        readTransaction.commit();


        session.close();
    }

    @Test
    public void editReport(){

        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction readTransaction = session.beginTransaction();
        Report readReport = session.get(Report.class, 1052);
        System.out.println("Read user back: " + readReport.toString());
        readReport.setQuizName("Matematik");
        session.update(readReport);
        readTransaction.commit();


    }

    @Test
    public void getReports(){
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();

        List reports = session.createQuery(" FROM Report ").list();

        for(Iterator iterator = reports.iterator(); iterator.hasNext();){
            Report report = (Report) iterator.next();

            System.out.println(report);
        }
    }

}
