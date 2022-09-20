import {useNavigate} from "react-router-dom";
import {React} from "react";

function Home() {

    const navigate = useNavigate()

    const toQuizzes = () => {
        navigate('/quizzes')
    }

    return (
        <div>
            <div>
                <h1> NEM Læringsplatform </h1>
                <h2> Vælg et fag </h2>
            </div>
            <div>
                <button onClick={toQuizzes}>* Matematik</button>
            </div>
            <div>
                <a onClick={toQuizzes}>* Dansk</a>
            </div>
            <div>
                <a onClick={toQuizzes}>* Historie</a>
            </div>
            <div>
                <a onClick={toQuizzes}>* Geografi</a>
            </div>
            <div>
            </div>
        </div>
    );

}

export default Home;
