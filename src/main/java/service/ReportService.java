package service;


import DB.HibernateController;
import DB.Report;
import DB.User;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.criteria.JpaCriteriaQuery;

import java.util.Arrays;
import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Path("reports")
public class ReportService {
    List <String> score = Arrays.asList("36/60", "54/60");

    @GET
    public List<String> Score() {
        return score;
    }



}
