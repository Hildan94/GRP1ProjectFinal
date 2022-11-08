package TestClass;

import DB.DataObjects.DummyController;
import DB.DataObjects.Report;
import DB.HibernateController;
import DB.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.testng.annotations.Test;

public class TestClass {
    @Test
    public void testCreate(){
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        User user = new User();
        System.out.println("UserID before commit: " + user.getId());
        user.setUsername("Melman");
        session.persist(user);
        transaction.commit();
        System.out.println("UserID after commit: " + user.getId());
        Transaction readTransaction = session.beginTransaction();
        User readUser = session.get(User.class, user.getId());
        System.out.println("Read user back: " + readUser.toString());
        readTransaction.commit();
        session.close();
    }

    @Test
    public void testCreateReport(){
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Report report = new Report();
        System.out.println("QuizId before commit: " + report.getQuizId());
        report.setUserId("Melman");
        session.persist(report);
        transaction.commit();
        System.out.println("QuizID after commit: " + report.getUserId());
        Transaction readTransaction = session.beginTransaction();
        Report readReport = session.get(Report.class, report.getQuizId());
        System.out.println("Read user back: " + readReport.toString());
        readTransaction.commit();

        session.close();
    }




}
