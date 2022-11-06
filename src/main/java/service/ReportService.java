package service;


import DB.DataObjects.Report;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.Arrays;
import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Path("reports")
public class ReportService {
    List<String>  score = Arrays.asList("36/60", "50/60");

    @GET
    public List<String>  Score(){return score;}


}
