import {useNavigate} from "react-router-dom";
import {React} from "react";

var currUserId, courseId, quizId, firstName, questionsCount;

function Quiz() {

    const navigate = useNavigate()

    const toQuizzes = () => {
        navigate('/quizzes')
    }

    const toHome = () => {
        navigate('/home')
    }

    return (
        <div>
            <div>
                <h1 onClick={toHome}> NEM Læringsplatform</h1>
            </div>
            <div>
                <h1> VALGT QUIZ </h1>
                <h2> Besvar spørgsmålene</h2>
            </div>
            <div>
                <h3> 1: Hvor mange grader er der i en trekant? </h3>
                <h5> * Svarmulighed 1</h5>
                <h5> * Svarmulighed 2</h5>
                <h5> * Svarmulighed 3</h5>
                <h5> * Svarmulighed 4</h5>
                <h5> * Svarmulighed 5</h5>
                <h3> 2: Hvad størrelse sko brugte Pythagoras? </h3>
                <h5> * Svarmulighed 1</h5>
                <h5> * Svarmulighed 2</h5>
                <h5> * Svarmulighed 3</h5>
                <h5> * Svarmulighed 4</h5>
                <h5> * Svarmulighed 5</h5>
            </div>
            <div>
                <button onClick={toQuizzes}>Gem og luk</button>
                <button onClick={toQuizzes}>Afslut quiz</button>
            </div>
        </div>
    );

}

export default Quiz;