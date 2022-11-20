package DB;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Table(name="Questions")
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    @Id @GeneratedValue
    private int id;
    private String questionName;
    private String answerA;
    private String answerB;
    private String answerC;
    private String answerD;
    private int correctAnswer;
}
