package service;

import DB.HibernateController;
import DB.User;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

/* Opgaver fra uge 8 der arbejdes med her */

@Path("users")
public class UserServices {

    @GET
    @Path("query")
    public List<User> queryUsers(@QueryParam("name") String name) throws
            NoImplementationException {
    //No implementation yet
        throw new NoImplementationException("user-queries not implemented, yet");
    }
/*
    public class NoImplementationException extends Exception {
        public NoImplementationException(String s) {
            super(s);
        }
    }

    @Provider
    public class NoImplementationExceptionMapper implements
            ExceptionMapper<NoImplementationException> {
        @Override
        public Response toResponse(NoImplementationException e) {
            return
                    Response.status(Response.Status.NOT_IMPLEMENTED).entity(e.getMessage()).
                            build();
        }
    }

*/


}

