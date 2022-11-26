package TestClass;

import DB.HibernateController;
import DB.QuizResult;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.testng.annotations.Test;
import java.util.Iterator;
import java.util.List;

@Test
public class TestQuizResult {


    @Test
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
        quizResult.setQuizid(802);
        quizResult.setSelectedAnswers("2, 4, ");
        quizResult.setUserid(1337);
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



    @Test
    public void testGet(){
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();

        List quizResult = session.createQuery(" FROM QuizResult ").list();
        //List reports = session.createQuery(" FROM Report ").list();

        for(Iterator iterator = quizResult.iterator(); iterator.hasNext();){
            QuizResult quizresult = (QuizResult) iterator.next();

            System.out.println(quizresult);
        }
    }
}
