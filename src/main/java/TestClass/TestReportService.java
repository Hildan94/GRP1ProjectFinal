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
import service.ReportService;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;
import java.io.IOException;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;

import static org.testng.Assert.assertEquals;

public class TestReportService {
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg").getSessionFactory();

    /**
     * Doesnt work on localhost for some reason
     */
    @Test
    public void httpTest() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("localhost:8080/api/reports/test"))
                .GET()
                .build();


        /*
        HttpResponse<String> response = HttpClient.newBuilder()
                .build()
                .send(request, HttpResponse.BodyHandlers.ofString());

         */

    }

    @Test
    public void testCreateReport(){
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
