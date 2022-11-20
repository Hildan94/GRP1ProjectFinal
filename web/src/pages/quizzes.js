import {useNavigate} from "react-router-dom";
import {React} from "react";
import { Helmet } from 'react-helmet';

var quizId, questionId;

function Quizzes() {

    const navigate = useNavigate()

    const toQuiznew = () => {
        navigate('/quiznew')
    }

    const toQuiz = () => {
        quizId = 10001;//Fix quiz id here
        questionId = 101; //default to 101 atm
        //navigate('/quiz/?quizid=' + quizId + '&questionid=' + questionId)
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
                <h3 onClick={toQuiz}> Quiz 1 blok</h3>
                <h3 onClick={toQuiz}> Quiz 2 blok</h3>
                <h3 onClick={toQuiz}> Quiz 3 blok</h3>
                <h3 onClick={toQuiz}> Quiz 4 blok</h3>
            </div>
            <div>
                <button onClick={toQuiznew}>Opret ny</button>
            </div>
            <div>
                <button onClick={toReports}>Generer rapport</button>
            </div>
        </div>
    );

}

export default Quizzes;