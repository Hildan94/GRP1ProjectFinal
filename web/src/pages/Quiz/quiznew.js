import {useNavigate} from "react-router-dom";
import React from "react";
import { Helmet } from 'react-helmet';
import Quiz from "./CreateQuiz";

function Quiznew() {

    const navigate = useNavigate()

    //functional components for navigation:
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
                <h1>Opret ny quiz</h1>

                <Quiz />
            </div>
        </div>
    );
}
export default Quiznew;