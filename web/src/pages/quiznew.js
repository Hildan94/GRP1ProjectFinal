import {useNavigate} from "react-router-dom";
import {React} from "react";

function Quiznew() {

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
                <h1 onClick={toHome}> NEM Læringsplatform </h1>
            </div>
            <div>
                <h1> VALGT FAG </h1>
                <h2> Indtast spørgsmål</h2>
            </div>
            <div>
                <h3> Spørgsmål 1</h3>
                <h4> Udfyld data om spm 1</h4>
                <h3> Spørgsmål 2</h3>
                <h4> Udfyld data om spm 2</h4>
                <h3> Spørgsmål 3</h3>
                <h4> Udfyld data om spm 3</h4>
                <h3> Spørgsmål 4</h3>
                <h4> Udfyld data om spm 4</h4>
            </div>
            <div>
                <button onClick={toQuizzes}>Opret quiz</button>
            </div>
        </div>
    );

}

export default Quiznew;