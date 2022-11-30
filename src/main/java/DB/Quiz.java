package DB;
import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name="Quiz")
@Getter
@Setter
@Builder
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class Quiz {
    @Id
    @Column(name = "quiz_id")
    @GeneratedValue
    private int id;

    @Column
    private String quizName;

    @Column
    private String category;

    @OneToMany(mappedBy = "parent",cascade = CascadeType.ALL)
    private List<Question> children = new LinkedList<>();
}

