package DB;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="DBUser") //!!WATCH out  USER is a reserved name!
@Getter
@Setter
@Builder
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class User {

    @Id @GeneratedValue
    @Column
    private int id;
    @Column
    private String username;
    @Column @Transient
    private String password;
    @Column @JsonIgnore
    private String hash;

}

