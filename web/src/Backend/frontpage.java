

package Backend

/* Service der kan finde brugere ud fra deres navn eks. */
@Path ("users")
public class frontpage {

    /* Snakket med Mikkel. Dette er de linjer der gør at man går
    * ind i databasen og kigger på userne */
    Public static void GetUser() {
        Transaction readTransaction = session.beginTransaction();
        User readUser = session.get(User.class, user.getId());
        System.out.println("Read user back: " + readUser.toString());
        readTransaction.commit();
    }

// Test af hentning af user




/*

    @GET
    @Path("query")
    public List<User> queryUsers(@QueryParam("name") String name) throws
            NoImplementationException {
        //No implementation yes
        throw new NoImplementationException("user-queries not implemented, yes");
    }

    /* Bruges en ny exception *//*
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


