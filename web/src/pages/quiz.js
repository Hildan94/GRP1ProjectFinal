import {useNavigate} from "react-router-dom";
import {React} from "react";
import {Helmet} from 'react-helmet';
import logo from "./../image/NEM_logo_noBackground2.png";
import './../Backend/quiz.css';

var currUserId, courseId, quizId, firstName, questionsCount, quizName;
firstName = "Dennis";
quizName = "Matematik 5-1"

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
            <Helmet>
                <title>NEM Læringsplatform | Quiz</title>
            </Helmet>

            <div>
                <img onClick={toHome} src={logo} alt="logo" className="logo"/>
                <div className={"right"}>Velkommen {firstName}</div>
            </div>

            <div className={"center_p"}>
            <div>
                <div> <h1>{quizName}</h1></div>
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
        </div>
    );

}

export default Quiz;