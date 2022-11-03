

package Backend


@Path ("users")
public class frontpage {

    @GET
    @Path("query")
    public List<User> queryUsers(@QueryParam("name") String name) throws
            NoImplementationException {
        //No implementation yes
        throw new NoImplementationException("user-queries not implemented, yes");
    }


    public class NoImplementationException extends Exception {
        public NoImplementationException(String s) {
            super(s);
        }
    }

    @Provider
    public class NoImplementationExceptionMapper implements ExceptionMapper<NoImplementationException> {

        @Override
        public Response toResponse(NoImplementationException e) {
            return Response.status(Response.Status.NOT_IMPLEMENTED).entity(e.getMessage()).build();
        }

        /* JWT-Controller-klasse, der kan udstede JWT-tokens. */
        public class JWTHandler {
            private static String key = "hæmli";
            private static final int TOKEN_EXPIRY = 2880; //2 days

            public static String generateJwtToken(User user) {
                Calendar expiry = Calendar.getInstance();
                expiry.add(Calendar.MINUTE, TOKEN_EXPIRY);
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    String s = objectMapper.writer().writeValueAsString(user);
                    return JWT.create()
                            .withIssuer("GiraffeDeluxe")
                            .withClaim("user", s)
                            .withExpiresAt(expiry.getTime())
                            .sign(Algorithm.HMAC512(key));
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }

                public static User validate (String s){
                    JWTVerfier verifier = JWT.require(Algorithm.HMAC512(key)).build();
                    DecodedJWT verify = verifier.verify(s);
                    Claim user = verify.getClaim("user");
                    try {
                        return new objectMapper().reader().forType(User.class).readValue(user.asString());
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        }

        /* endpoint til at uddele tokens */
        /* endpoint til at uddele tokens */
        @Path("login")
        @Produces(MediaType.APPLICATION_JSON)
        @Consumes(MediaType.APPLICATION_JSON)
        public class LoginService {

            @POST
            public String postLoginData(loginData login) throws NotAuthorizedException
            {
                if (login!=null && "brian".equals(login.getUsername()) &&
                        "kodeord".equals(login.getPassword())){
                    return JWTHandler.generateJwtToken(new
                            User(login.getUsername(), ""));
            }
            throw new NotAuthorizedException("forkert brugernavn/kodeord");
        }

    }
    public class NotAuthorizedException extends Throwable {
        public NotAuthorizedException(String s) {
            super(s);
        }
    }
    }

    @Provider
    public class NotAuthorizedException implements ExceptionMapper<NotAuthorizedException> {

        @Override
        public Response toResponse(NotAuthorizedException e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        }
    }

    /*  data-klasse til login data */
    @Data
    @NoArgsConstructor
    public class LoginData {
        private string username;
        private String password;
    }
}



