

package Backend

/* Service der kan finde brugere ud fra deres navn eks. */
@Path ("users")
public class frontpage {



    @GET
    @Path("query")
    public List<User> queryUsers(@QueryParam("name") String name) throws
            NoImplementationException {
        //No implementation yes
        throw new NoImplementationException("user-queries not implemented, yes");
    }

    /* Bruges en ny exception */
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

}


