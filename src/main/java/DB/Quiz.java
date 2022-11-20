package DB;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name="Quiz")
@Entity
@Getter
@Setter
@Builder
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class Quiz {
    @Id
    @GeneratedValue
    private int id;
    @OneToMany
    private List<Question> questionsList;
}

