import {useNavigate} from "react-router-dom";
import React from "react";
import { Helmet } from 'react-helmet';
import './assets/quiz.css';
import Question from "./CreateQuestion";

function Questionsnew() {

    const navigate = useNavigate()

    //functional components for navigation:
    const toHome = () => {
        navigate('/home')
    }

    return (
        <div>
            <Helmet>
                <title>NEM Læringsplatform | Opret spørgsmål</title>
            </Helmet>
            <div>
                <h1 onClick={toHome}> NEM Læringsplatform </h1>
            </div>
            <div>
                <h1>Opret spørgsmål</h1>
                <Question />
            </div>
        </div>
    );
}

export default Questionsnew;