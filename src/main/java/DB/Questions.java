package DB;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="Questions")
@Getter
@Setter
@Builder
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class Questions {

    @Id @GeneratedValue
    @Column
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
    private int answerNr;


}