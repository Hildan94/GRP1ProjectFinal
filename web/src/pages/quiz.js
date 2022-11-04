import {useNavigate} from "react-router-dom";
import {React} from "react";
import {Helmet} from 'react-helmet';
import logo from "./../image/NEM_logo_noBackground2.png";
import './../Backend/quiz.css';
import {Checkbox} from "@mui/material";
import { useSearchParams } from "react-router-dom";


var currUserId, courseName, quizId, firstName, questionsCount, quizName, lastName;
var question1, question2, question3, answer1, answer2, answer3, boolQuestion;
var questionCounter; //used to keep track of current question no for page no | locally
//firstName = "Dennis";
//quizName = "Matematik 5-1"

var quizIdParam = 1;

var quizObject = {
    "id": quizId = 10001,
    "courseName": courseName = 'Matematik 5-1',
    "questionsCount": questionsCount = 3,
    "question1": question1 = "Hvad er 1",
    "question2": question2 = "Hvad er 2",
    "question3": question3 = "Hvad er 3",
    "answer1": answer1 = "Det er 1",
    "answer2": answer2 = "Det er 2",
    "answer3": answer3 = "Det er 3",
    "boolQuestion": boolQuestion = false,
}

var userObject = {
    "id": currUserId = 11337,
    "firstname": firstName = 'Dennis',
    "lastname": lastName = 'Jensen',
}

function Quiz() {

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(window.location.pathname);

    var currPath = window.location.pathname;
    var pathParams = currPath.substring(currPath.indexOf('/') + 6);
    var paramQuizId = pathParams.slice(0,5);
    var paramQuestionId = pathParams.substring(pathParams.indexOf('/') + 1);

    var questionFromParam = 'quizObject.question' + (paramQuestionId -100 );
    console.log(questionFromParam);


    const navigate = useNavigate()

    const toQuizzes = () => {
        navigate('/quizzes')
    }

    const toHome = () => {
        navigate('/home')
    }

    const toNextQuestion = () => {
        paramQuestionId ++;
        navigate(currPath.slice(0,-3) + paramQuestionId)
    }

    const toPrevQuestion = () => {
        if (paramQuestionId > 101) {
            paramQuestionId --;
        }
        navigate(currPath.slice(0,-3) + paramQuestionId)
    }

    const toQuestion = () => {
        navigate('/home')
    }

    return (

        <div>
            <Helmet>
                <title>NEM Læringsplatform | Quiz</title>
            </Helmet>

            <div>
                <img onClick={toHome} src={logo} alt="logo" className="logo"/>
                <div className={"right"}>Velkommen {firstName}</div>
            </div>

            <div className={"center_p"}>
            <div>
                <div> <h1>{quizObject.courseName}</h1></div>
            </div>
            <div>
                <h3> 1: {eval(questionFromParam)} </h3>
                <h5> <Checkbox></Checkbox>{quizObject.answer1}</h5>
                <h5> <Checkbox></Checkbox>{quizObject.answer2}</h5>
                <h5> <Checkbox></Checkbox>{quizObject.answer3}</h5>
            </div>
                <div>
                    <button onClick={toPrevQuestion}>Tilbage</button>
                    <button onClick={toNextQuestion}>Frem</button>
                </div>
            <div>
                <button onClick={toQuizzes}>Gem og luk</button>
                <button onClick={toQuizzes}>Afslut quiz</button>
            </div>
        </div>
        </div>
    );

}

export default Quiz;