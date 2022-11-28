package TestClass;

import DB.HibernateController;
import DB.Report;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.testng.annotations.Test;

import java.util.Iterator;
import java.util.List;

public class TestReportService {

    @Test
    public void testCreateReport(){
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
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