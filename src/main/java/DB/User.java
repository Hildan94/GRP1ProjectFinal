package DB;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.Table;

    @Entity
    @Table(name = "DBUSER") //WATCH out  USER is a reserved name!
    public class User {
        @Id
        @GeneratedValue
        @Column(name = "id")
        private int id;
        @Column(name = "username")
        private String username;
// TODO: Remember Getters and setters as well



    }
