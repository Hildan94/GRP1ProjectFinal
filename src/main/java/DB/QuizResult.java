package DB;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="DBQuizResult")
@Getter
@Setter
@Builder
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class QuizResult {

    @Id @GeneratedValue
    @Column
    private int id;
    @Column
    private String selectedAnswers;
    @Column
    private int quizid;

}
