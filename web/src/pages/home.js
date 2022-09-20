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
                <a href="#/" onClick={toQuizzes}>* Matematik</a>
            </div>
            <div>
                <a href="#/" onClick={toQuizzes}>* Dansk</a>
            </div>
            <div>
                <a href="#/" onClick={toQuizzes}>* Historie</a>
            </div>
            <div>
                <a href="#/" onClick={toQuizzes}>* Geografi</a>
            </div>
            <div>
            </div>
        </div>
    );

}

export default Home;
