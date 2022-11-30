package service;

import DB.HibernateController;
import DB.Quiz;
import DB.Question;
import DB.User;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.criteria.JpaCriteriaQuery;
import service.exceptions.NoImplementationException;

import java.util.List;


@Produces(MediaType.APPLICATION_JSON)
@Path("quiznew")
public class QuizService {
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg").getSessionFactory();

    @POST
    public int createQuiz(Quiz quiz, @HeaderParam("Authorization") String token){
        User validate = JWTHandler.validate(token);
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.persist(quiz);
        transaction.commit();

        return quiz.getId();
    }

    @POST
    @Path("/questions/{id}")
    public int addQuestions(@PathParam("id") int quizId, List<Question> children, @HeaderParam("Authorization") String token){
        User validate = JWTHandler.validate(token);
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Quiz quiz = session.get(Quiz.class, quizId);
        quiz.setChildren(children);
        for(Question question: quiz.getChildren()){
            question.setParent(quiz);
        }
        session.persist(quiz);
        transaction.commit();

        return quiz.getId();
    }

    @GET
    @Path("/questions/{id}")
    public int getTest(@PathParam("id") int quizId){
        return quizId;
    }

    @GET
    public List<Quiz> getQuizzes(){
        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<Quiz> query = session.getCriteriaBuilder().createQuery(Quiz.class);
        query.from(Quiz.class);
        return session.createQuery(query).getResultList();
    }

    @GET
    @Path("query")
    public List<Quiz> queryQuestions(@QueryParam("Quiz") String question) throws NoImplementationException {
        //No implementation yet
        throw new NoImplementationException("Quiz-queries not implemented yet");
    }
}

