package service;


import DB.Report;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.Arrays;
import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Path("reports")
public class ReportService {

    List <String> score = Arrays.asList("36/60", "54/60");
    List <Report> reports = Arrays.asList(
            //new Report(40, "Melman", "40","60","Matematik"),
            new Report(40, "Melman2", "43","60","Matematik"))
            ;
    public void addItem(){
        reports.add(reports.get(0));
    }
    @GET
    public List<String> Score() {
        return score;
    }

    @POST
    public void createReport(){
        addItem();
    }

    @Path("1")
    @GET
    public List<Report> reports(){
        return reports;
    }
    @Path("new")
    @GET
    public List<Report> score(){
        return reports;
    }
    /*

    public int createReport(Report report){
        Session session = sessionFactory.openSession();
        session.persist(report);
        return report.getQuizId();
    }

     */



}
