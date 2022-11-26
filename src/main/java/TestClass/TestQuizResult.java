package TestClass;

import DB.HibernateController;
import DB.QuizResult;
import jakarta.persistence.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.testng.annotations.Test;

import java.util.Iterator;
import java.util.List;

@Test
public class TestQuizResult {

    int createdId, createdIdEdited = 0; //createdId is the id which gets made when a new database entry is made. CreatedIdEdited is the id which this is changed to using the edit test.

    //Booleans are used to declare which tests you want to run
    boolean runPost = true;
    boolean runEdit = true;
    boolean runGet = true;
    boolean runDelete = true;

    @Test
    public void testCreate() {
        if (!runPost) {return;}

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
        createdId = quizResult.getId();
        session.close();
        System.out.println("Created ID for testing is: " + createdId);
    }


    @Test
    public void testGet() {
        if (!runGet) {return;}

        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();

        List quizResult = session.createQuery(" FROM QuizResult ").list();

        for (Iterator iterator = quizResult.iterator(); iterator.hasNext(); ) {
            QuizResult quizresult = (QuizResult) iterator.next();

            System.out.println(quizresult);
        }
        session.close();
    }


    @Test
    public void testEdit() {
        if (!runEdit) {return;}

        int idToEdit = createdId; //this is the unique id from dbquizresult table wanting to be edited
        int newValue = createdId++; //this is the value we want to change something to
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction readTransaction = session.beginTransaction();
        QuizResult readQuizResult = session.get(QuizResult.class, idToEdit);
        System.out.println("Value before edit: " + readQuizResult.toString());
        readQuizResult.setUserid(newValue);
        session.update(readQuizResult);
        readTransaction.commit();
        System.out.println("Value after edit: " + readQuizResult.toString());
        createdIdEdited = readQuizResult.getId();
        System.out.println("The edited ID for test is: " + createdIdEdited);
        session.close();
    }


    @Test
    public void testDelete() {
        if (!runDelete) {return;}

        int idToAffect = createdIdEdited;
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction readTransaction = session.beginTransaction();

        String sql = "DELETE FROM QuizResult WHERE id = " + String.valueOf(idToAffect) + "";
        Query query = session.createQuery(sql);
        query.executeUpdate();
        session.getTransaction().commit();
        session.close();

    }


}

