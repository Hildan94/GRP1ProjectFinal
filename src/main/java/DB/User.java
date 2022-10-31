package DB;


import jakarta.persistence.*;

@Entity
    @Table(name = "DBUSER") //WATCH out  USER is a reserved name!
    public class User {
        @Id
        @GeneratedValue
        @Column(name = "id")
        private int id;
        @Column(name = "username")
        private String username;

    public int getId() {
        return id;
    }

    public void setUsername(String username) {
        this.username = username;
    }
// TODO: Remember Getters and setters as well



    }
