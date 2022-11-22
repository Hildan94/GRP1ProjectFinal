package service;

import DB.User;
import com.fasterxml.jackson.annotation.JacksonInject;
import org.hibernate.Transaction;
import org.hibernate.engine.spi.SessionDelegatorBaseImpl;

/* Backend for login*/
public class Login {

    public void GetUser() {
        /* Snakket med Mikkel. Dette er de linjer der gør at man går
         * ind i databasen og kigger på userne */

        SessionDelegatorBaseImpl session = null;
        JacksonInject.Value user = null;

        Transaction readTransaction = session.beginTransaction();
        User readUser = session.get(User.class, user.getId());
        System.out.println("Read user back: " + readUser.toString());
        readTransaction.commit();
    }
}
