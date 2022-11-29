package service;

import DB.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.Logger;

import java.util.Calendar;

@Log4j2
public class JWTHandler {
    private static String key = "hæmli";
    private static final int TOKEN_EXPIRY = 2880; //2 days
    public static String generateJwtToken(User user) {

        log.info(user.getId() + "Is trying to generate a token");

        Calendar expiry = Calendar.getInstance();
        expiry.add(Calendar.MINUTE, TOKEN_EXPIRY);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String s = objectMapper.writer().writeValueAsString(user);
            return JWT.create().withIssuer("Server").withClaim("user", s).withExpiresAt(expiry.getTime()).sign(Algorithm.HMAC512(key));
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public static User validate(String s) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC512(key)).build();
        DecodedJWT verify = verifier.verify(s);
        Claim user = verify.getClaim("user");
        try {
            return new ObjectMapper().reader().forType(User.class).readValue(user.asString());
        } catch (JsonProcessingException e) {
            log.error("User with token " + s + "failed to validate");
            throw new RuntimeException(e);
        }
    }
}
