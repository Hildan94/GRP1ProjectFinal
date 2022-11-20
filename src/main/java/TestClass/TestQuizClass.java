package TestClass;

import DB.HibernateController;
import DB.Question;
import DB.Quiz;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.testng.annotations.Test;

import java.util.LinkedList;
import java.util.List;

@Test
public class TestQuizClass {
    public void testCreateMultipleQuestions(){
        HibernateController hibernateController =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Quiz quiz = new Quiz();
        System.out.println("QuizID before commit: " + quiz.getId());
        List<Question> questionsList = new LinkedList<Question>();
        Question question = new Question();
        question.setQuestionName("Hvad er hovedstaden i Danmark?");
        question.setAnswerA("København");
        question.setAnswerB("Stockholm");
        question.setAnswerC("Oslo");
        question.setAnswerD("Reykavík");
        question.setCorrectAnswer(0);
        questionsList.add(question);
        Question question2 = new Question();
        question2.setQuestionName("Hvilken farver er i det norkse flag?");
        question2.setAnswerA("Grøn, lilla og gul");
        question2.setAnswerB("Rød, hvid og blå");
        question2.setAnswerC("Orange og blå");
        question2.setAnswerD("Blå og gul");
        question2.setCorrectAnswer(1);
        questionsList.add(question2);
        quiz.setQuestionsList(questionsList);
        session.persist(question);
        session.persist(question2);
        session.persist(quiz);
        transaction.commit();
        System.out.println("QuizID after commit: " + quiz.getId());
        Transaction readTransaction = session.beginTransaction();
        Quiz readQuiz = session.get(Quiz.class, quiz.getId());
        System.out.println("Read quiz back: " + readQuiz.toString());
        readTransaction.commit();
        session.close();
    }
    public void testCreateSingleQuestion(){
        HibernateController hibernateController2 =
                new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg");
        SessionFactory sessionFactory = hibernateController2.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Quiz quiz = new Quiz();
        System.out.println("QuizID before commit: " + quiz.getId());
        List<Question> questionsList = new LinkedList<Question>();
        Question question = new Question();
        question.setQuestionName("Hvor mange sider har et octagon?");
        question.setAnswerA("6");
        question.setAnswerB("9");
        question.setAnswerC("2");
        question.setAnswerD("8");
        question.setCorrectAnswer(3);
        questionsList.add(question);
        quiz.setQuestionsList(questionsList);
        session.persist(question);
        session.persist(quiz);
        transaction.commit();
        System.out.println("QuizID after commit: " + quiz.getId());
        Transaction readTransaction = session.beginTransaction();
        Quiz readQuiz = session.get(Quiz.class, quiz.getId());
        System.out.println("Read quiz back: " + readQuiz.toString());
        readTransaction.commit();
        session.close();
    }
}
