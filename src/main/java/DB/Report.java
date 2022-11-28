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
    private int id;
    @Column
    private String quizName;
    @Column
    private String quizResultTotalQuestions;
    @Column
    private String quizRightResults;
    @Column
    private String userId;
}
