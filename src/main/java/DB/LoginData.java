package DB;

import jakarta.persistence.*;
import lombok.*;


@Data
@NoArgsConstructor
public class LoginData {
    private String username;
    private String password;
}
