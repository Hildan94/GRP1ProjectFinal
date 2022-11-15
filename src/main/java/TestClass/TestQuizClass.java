package TestClass;

import DB.HibernateController;
import DB.Questions;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.testng.annotations.Test;

@Test
public class TestQuizClass {
    public void testCreate(){
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Questions questions = new Questions();
        System.out.println("QuestionID before commit: " + questions.getId());
        questions.setQuestionName("Hvad er Danmarks hovedstad?");
        questions.setAnswerA("Paris");
        questions.setAnswerB("Oslo");
        questions.setAnswerC("København");
        questions.setAnswerD("London");
        questions.setAnswerNr(3);
        session.persist(questions);
        transaction.commit();
        System.out.println("QuestionID after commit: " + questions.getId());
        Transaction readTransaction = session.beginTransaction();
        Questions readQuestions = session.get(Questions.class, questions.getId());
        System.out.println("Read questions back: " + readQuestions.toString());
        readTransaction.commit();
        session.close();
    }
}
