package TestClass;

import DB.HibernateController;
import DB.QuizResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.testng.annotations.Test;

@Test
public class TestQuizResult {

    public void testCreate(){
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        QuizResult quizResult = new QuizResult();
        System.out.println("QuizResult ID before commit: " + quizResult.getId());
        System.out.println("Quiz ID before commit: " + quizResult.getQuizid());
        System.out.println("Selected answers before commit: " + quizResult.getSelectedAnswers());
        quizResult.setQuizid(752);
        quizResult.setSelectedAnswers("1, 3, ");
        session.persist(quizResult);
        transaction.commit();
        System.out.println("QuizResult ID after commit: " + quizResult.getId());
        System.out.println("Quiz ID after commit: " + quizResult.getQuizid());
        System.out.println("Selected answers after commit: " + quizResult.getSelectedAnswers());
        Transaction readTransaction = session.beginTransaction();
        QuizResult readQuizResult = session.get(QuizResult.class, quizResult.getId());
        System.out.println("Read quiz result: " + readQuizResult.toString());
        readTransaction.commit();
        session.close();
    }

    public void testGet(){
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        QuizResult quizResult = new QuizResult();
        System.out.println("QuizResult ID before commit: " + quizResult.getId());
        System.out.println("Quiz ID before commit: " + quizResult.getQuizid());
        System.out.println("Selected answers before commit: " + quizResult.getSelectedAnswers());
        quizResult.setQuizid(752);
        quizResult.setSelectedAnswers("1, 3, ");
        session.persist(quizResult);
        transaction.commit();
        System.out.println("QuizResult ID after commit: " + quizResult.getId());
        System.out.println("Quiz ID after commit: " + quizResult.getQuizid());
        System.out.println("Selected answers after commit: " + quizResult.getSelectedAnswers());
        Transaction readTransaction = session.beginTransaction();
        QuizResult readQuizResult = session.get(QuizResult.class, quizResult.getId());
        System.out.println("Read quiz result: " + readQuizResult.toString());
        readTransaction.commit();
        session.close();
    }
}
