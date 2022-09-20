import {useNavigate} from "react-router-dom";
import {React} from "react";

function Quizzes() {

    const navigate = useNavigate()

    const toQuiznew = () => {
        navigate('/quiznew')
    }

    const toQuiz = () => {
        navigate('/quiz')
    }

    const toReports = () => {
        navigate('/reports')
    }

    const toHome = () => {
        navigate('/home')
    }

    return (
        <div>
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