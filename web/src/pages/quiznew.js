import {useNavigate} from "react-router-dom";
import {React} from "react";
import { Helmet } from 'react-helmet';
import OutlinedCard from "../Backend/Quiz_card";

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
            <Helmet>
                <title>NEM Læringsplatform | Opret quiz</title>
            </Helmet>
            <div>
                <h1 onClick={toHome}> NEM Læringsplatform </h1>
            </div>

            <div>
                <h1> VALGT FAG </h1>
                <OutlinedCard />
            </div>

            <div>
                <button onClick={toQuizzes}>Opret quiz</button>
            </div>
        </div>
    );

}

export default Quiznew;