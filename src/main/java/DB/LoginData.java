package DB;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name="DBUser") //!!WATCH out  USER is a reserved name!
@Data
@NoArgsConstructor
public class LoginData {
    @Id
    @GeneratedValue
    @Column
    private int id;
    @NonNull
    private String username;
    @NonNull
    private String password;
}

