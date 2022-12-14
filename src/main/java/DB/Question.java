package DB;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
    @Column
    private String questionName;
    @Column
    private String answerA;
    @Column
    private String answerB;
    @Column
    private String answerC;
    @Column
    private String answerD;
    @Column
    private int correctAnswer;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_fk")
    @JsonIgnore
    private Quiz parent;
}