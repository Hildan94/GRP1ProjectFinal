import {useNavigate} from "react-router-dom";
import {React} from "react";

function Reports() {

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
                <h2> Vælg den ønskede quiz at generere rapport ud fra</h2>
            </div>
            <div>
                <h3> Quiz 1 blok</h3>
                <h3> Quiz 2 blok</h3>
                <h3> Quiz 3 blok</h3>
                <h3> Quiz 4 blok</h3>
            </div>
            <div>
                <button onClick={toQuizzes}>Generer rapport</button>
            </div>
        </div>
    );

}

export default Reports;