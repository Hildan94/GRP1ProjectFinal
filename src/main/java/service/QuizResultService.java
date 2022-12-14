package service;

import DB.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.criteria.JpaCriteriaQuery;
import service.exceptions.NoImplementationException;

import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Path("quizresult")
public class QuizResultService {
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg").getSessionFactory();

    @POST
    public int createQuizResult(QuizResult quizResult) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        quizResult.setQuizid(quizResult.getQuizid());
        System.out.println("Read user id: " + quizResult.getUserid());
        quizResult.setSelectedAnswers(quizResult.getSelectedAnswers());
        quizResult.setUserid(quizResult.getUserid());
        System.out.println("This is the QuizResult you created: " + quizResult);
        session.persist(quizResult);
        transaction.commit();
        session.close();
        return quizResult.getId();
    }

    @GET
    public List<QuizResult> getQuizResult() {
        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<QuizResult> query = session.getCriteriaBuilder().createQuery(QuizResult.class);
        query.from(QuizResult.class);
        List<QuizResult> data = session.createQuery(query).getResultList();
        return data;
    }

    @GET
    @Path("query")
    public List<QuizResult> queryQuizResult(@QueryParam("quizresult") String quizresult) throws NoImplementationException {
        throw new NoImplementationException("quizresult-queries not implemented yet");
    }

    @GET
    @Path("questions")
    public List<Question> getQuestions() {
        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<Question> query = session.getCriteriaBuilder().createQuery(Question.class);
        query.from(Question.class);
        List<Question> data = session.createQuery(query).getResultList();
        return data;
    }

    @GET
    @Path("quizquestions")
    public List<Quiz_Questions> getQuiz_Questions() {
        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<Quiz_Questions> query = session.getCriteriaBuilder().createQuery(Quiz_Questions.class);
        query.from(Quiz_Questions.class);
        List<Quiz_Questions> data = session.createQuery(query).getResultList();
        return data;
    }

    @GET
    @Path("quiz")
    public List<Quiz> getQuiz() {
        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<Quiz> query = session.getCriteriaBuilder().createQuery(Quiz.class);
        query.from(Quiz.class);
        List<Quiz> data = session.createQuery(query).getResultList();
        return data;
    }


}

