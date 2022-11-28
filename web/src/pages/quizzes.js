import {useNavigate} from "react-router-dom";
import {React} from "react";
import {Helmet} from 'react-helmet';

var db_quiz_Object = [
    {
        quiz_id: "752",
        category: "Geografi",
    },

    {
        quiz_id: "802",
        category: "Matematik",
    },
];

var quizId, questionId;


function Quizzes() {

    const navigate = useNavigate()

    const toQuiznew = () => {
        navigate('/quiznew')
    }

    const toQuiz = (e) => {
        console.log("Selected quiz id: " + e)
        quizId = e //10001;
        questionId = 101; //default to 101 atm
        navigate('/quiz/' + quizId + '/' + questionId)

    }

    const toReports = () => {
        navigate('/reportsoverview')
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
                <h1 onClick={toHome}> NEM Læringsplatform </h1>
            </div>
            <div>
                <h1> VALGT FAG </h1>
                <h2> Vælg den ønskede quiz, opret ny eller generer rapport</h2>
            </div>
            <div>
                {db_quiz_Object.map(function (d, idx) {
                    return (
                        <ul onClick={() => toQuiz(d.quiz_id)} key={idx}><h3>* Quiz {idx + 1 + ": " + d.category} </h3>
                        </ul>)
                })}
            </div>
            <div>
                <button onClick={toQuiznew}>Opret ny quiz</button>
            </div>
            <br/>
            <div>
                <button onClick={toReports}>Generer rapport</button>
            </div>
        </div>
    );

}

export default Quizzes;
