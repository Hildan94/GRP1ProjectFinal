package DB;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="DBreport") //!!WATCH out  USER is a reserved name!
@Getter
@Setter
@Builder
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue
    @Column
    private int quizId;
    @Column
    private String userId;
    @Column
    private String quizRightResults;
    @Column
    private String quizResultTotalQuestions;
}
