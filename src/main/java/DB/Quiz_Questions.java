package DB;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="quiz_questions")
@Getter
@Setter
@Builder
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class Quiz_Questions {
    @Id
    @Column
    private int quiz_id;
    @Column
    private int questionslist_id;

}
