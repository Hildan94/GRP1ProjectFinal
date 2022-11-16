import {useNavigate} from "react-router-dom";
import {React} from "react";
import { Helmet } from 'react-helmet';

function Home() {

    const navigate = useNavigate()

    const toQuizzes = () => {
        navigate('/quizzes')
    }

    return (
        <div>
            <Helmet>
                <title>NEM Læringsplatform</title>
            </Helmet>
            <div>
                <h1> NEM Læringsplatform </h1>
                <h2> Vælg et fag </h2>
            </div>
            <div>
                <button onClick={toQuizzes}>* Matematik</button>
            </div>
            <div>
                <button onClick={toQuizzes}>* Dansk</button>
            </div>
            <div>
                <button onClick={toQuizzes}>* Historie</button>
            </div>
            <div>
                <button onClick={toQuizzes}>* Geografi</button>
            </div>
            <div>
            </div>
        </div>
    );

}

export default Home;
