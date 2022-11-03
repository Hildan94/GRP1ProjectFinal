package service;


import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.Arrays;
import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Path("reports")
public class ReportService {
    List<String>  score = Arrays.asList("Dette", "er", "backenden");
    @GET
    public List<String>  Score(){return score;}
}
