package service;

import DB.HibernateController;
import DB.Quiz;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.criteria.JpaCriteriaQuery;

import java.util.List;


@Produces(MediaType.APPLICATION_JSON)
@Path("quizzes")
public class QuizService {
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg").getSessionFactory();

    @POST
    public int createQuiz(Quiz quiz){
        Session session = sessionFactory.openSession();
        session.persist(quiz);
        return quiz.getId();
    }

    @GET
    public List<Quiz> getQuizzes(){
        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<Quiz> query = session.getCriteriaBuilder().createQuery(Quiz.class);
        query.from(Quiz.class);
        List<Quiz> data = session.createQuery(query).getResultList();
        return data;
    }

    @GET
    @Path("query")
    public List<Quiz> queryQuestions(@QueryParam("Quiz") String question) throws NoImplementationException {
        //No implementation yet
        throw new NoImplementationException("Quiz-queries not implemented yet");
    }
}

