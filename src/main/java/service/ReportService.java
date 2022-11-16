package service;


import DB.Report;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Path("reports")
public class ReportService {

    List <String> score = Arrays.asList("36/60", "54/60");
    static List <Report> reports = new LinkedList<>(Arrays.asList(
            new Report(40, "Melman", "40","60","Matematik"),
            new Report(40, "Melman2", "43","60","Matematik")));


    public void addItem(){
        reports.add(new Report(55, "Marius", "60","60","Matematik"));
    }
    @GET
    public List<String> Score() {
        return score;
    }

    @POST
    public void createReport(){
        System.out.println(reports);
        addItem();
        System.out.println(reports);
    }

    @Path("1")
    @GET
    public List<Report> reports(){
        return reports;
    }
    @Path("bla")
    @GET
    public List<Report> score(){
        return reports;
    }

}
