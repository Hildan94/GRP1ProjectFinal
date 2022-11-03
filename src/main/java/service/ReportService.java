package service;


import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Produces(MediaType.APPLICATION_JSON)
@Path("reports")
public class ReportService {
    int score = 100;
    @GET
    public int Score(){return score;}
}
