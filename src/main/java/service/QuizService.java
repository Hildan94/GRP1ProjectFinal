package service;

import DB.HibernateController;
import DB.Questions;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.criteria.JpaCriteriaQuery;
import service.exceptions.NoImplementationException;

import java.util.List;


@Produces(MediaType.APPLICATION_JSON)
@Path("quizzes")
public class QuizService {
    private static final SessionFactory sessionFactory = new HibernateController("pgtest-db.caprover.grp1.diplomportal.dk:6543/pg").getSessionFactory();

    @POST
    public int createQuestions(Questions questions){
        Session session = sessionFactory.openSession();
        session.persist(questions);
        return questions.getId();
    }

    @GET
    public List<Questions> getQuestions(){
        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<Questions> query = session.getCriteriaBuilder().createQuery(Questions.class);
        query.from(Questions.class);
        List<Questions> data = session.createQuery(query).getResultList();
        return data;
    }

    @GET
    @Path("query")
    public List<Questions> queryQuestions(@QueryParam("question") String question) throws NoImplementationException {
        //No implementation yet
        throw new NoImplementationException("question-queries not implemented yet");
    }
}

