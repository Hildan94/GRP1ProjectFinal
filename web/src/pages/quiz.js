import {useNavigate} from "react-router-dom";
import {React, useState} from "react";
import {Helmet} from 'react-helmet';
import logo from "./../image/NEM_logo_noBackground2.png";
import './../Backend/quiz.css';
import {Checkbox, checkboxClasses} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {RadioButtonUnchecked, Update} from "@material-ui/icons";
import Button from "@mui/material/Button";


var currUserId, courseName, quizId, firstName, questionsCount, quizName, lastName, username;
var question1, question2, question3, answer1, answer2, answer3, boolQuestion;
var questionCounter; //used to keep track of current question no for page no | locally
//firstName = "Dennis";
//quizName = "Matematik 5-1"

var quizIdParam = 1;

var quizObject = {
    "id": quizId = 452,
}

var quizObject = { //old one
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

var questionsObject = [
    {
        questionName: "Hovedstad i DK?",
        correctAnswer: 0,
        questionId: 452,
        answera: "Kbh",
        answerb: "Not kbh",
        answerc: "Also not kbh",
        answerd: "Especially not kbh",
    },
    /*
    {
        questionName: "Hovedstad i EN?",
        correctAnswer: 0,
        questionId: 453,
        answera: "London",
        answerb: "Not London",
        answerc: "Also not London",
        answerd: "Especially not London",
    },

     */
];


var userObject = {
    "id": currUserId = 11337,
    "username": username = 'Dennis'
}

function UpdateAnswer() {

    //Get the correct current question number without unncessary re renders
    var currPath = window.location.pathname;
    var pathParams = currPath.substring(currPath.indexOf('/') + 6);
    var paramQuestionId = pathParams.substring(pathParams.indexOf('/') + 1);
    var questionFromParamNumber = paramQuestionId - 100;
    console.log("UpdateAnswer says current question is: )" + questionFromParamNumber.toString());
    return questionFromParamNumber;

}

//Inspiration:  stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function Quiz() {

    //Use these states to get answers. If active1 === true, then it is chosen, so value 1
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);

    //const [questionNav, setQuestionNav] = useState(1); //for navigation purposes attempt

    const [answers, setAnswers] = useState(''); //to store all answers. Be aware this is only updated correctly after it has been updated


    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(window.location.pathname);

    let selectedQuestions = 0; //should never exceed 1
    //let selectedAnswer = 0; //0 is default no answer. 1 is option 1, 2 option 2 etc.

    var currPath = window.location.pathname;
    var pathParams = currPath.substring(currPath.indexOf('/') + 6);
    var paramQuizId = pathParams.slice(0, 5);
    var paramQuestionId = pathParams.substring(pathParams.indexOf('/') + 1);

    var questionFromParam = 'quizObject.question' + (paramQuestionId - 100);
    let questionFromParamNumber = paramQuestionId - 100;
    console.log(questionFromParam);


    const navigate = useNavigate()

    const toQuizzes = () => {
        navigate('/quizzes')
    }

    const toHome = () => {
        navigate('/home')
    }

    const toNextQuestion = () => {
        paramQuestionId++;
        navigate(currPath.slice(0, -3) + paramQuestionId)
        //reset selected question
        setActive1(false);
        setActive2(false);
        setActive3(false);
        setActive4(false);

        if (answers.length === 0) {
            //At 1st question and it has not been answered. Leave all options unchecked
        } else {
            let answerOfQuestionIndex = UpdateAnswer()*3-3//answers.charAt(0); //should return answer of the first question
            console.log("answerOfQuestionIndex: " + answerOfQuestionIndex.toString());
            let answerOfQuestion = answers.charAt(answerOfQuestionIndex);
            console.log("answerOfQuestion: " + answerOfQuestion.toString());
            let updateAnswerBox = 'setActive' + answerOfQuestion + '(true)'
            console.log("updateAnswerBox: " + updateAnswerBox.toString());
            eval(updateAnswerBox);
        }

        console.log("ANSWERS: " + answers.toString());
        //console.log("The selected answer for this question is" + question);

    }

    const toPrevQuestion = () => {
        if (paramQuestionId > 101) {
            paramQuestionId--;
        }
        navigate(currPath.slice(0, -3) + paramQuestionId)

        //Determine which question this is, and what answer it has saved (if any!, primarily used if this question has already been visited and answered

        setActive1(false);
        setActive2(false);
        setActive3(false);
        setActive4(false);

        if (answers.length === 0) {
            //At 1st question and it has not been answered. Leave all options unchecked
        } else {
            let answerOfQuestionIndex = UpdateAnswer()*3-3//answers.charAt(0); //should return answer of the first question
            console.log("answerOfQuestionIndex: " + answerOfQuestionIndex.toString());
            let answerOfQuestion = answers.charAt(answerOfQuestionIndex);
            console.log("answerOfQuestion: " + answerOfQuestion.toString());
            let updateAnswerBox = 'setActive' + answerOfQuestion + '(true)'
            console.log("updateAnswerBox: " + updateAnswerBox.toString());
            eval(updateAnswerBox);
        }

        console.log("ANSWERS: " + answers.toString());


        /*
        if (UpdateAnswer() === 1) {
            if (answers.length === 0) {
                //At 1st question and it has not been answered. Leave all options unchecked
            } else {
                let temp = answers.charAt(0); //should return answer of the first question
                let temp2 = 'setActive' + temp + '(true)'
                eval(temp2);
            }
        } else if (UpdateAnswer() > 1) {
            let temp = UpdateAnswer() * 3 -1; //The index value of the answer we want. Found by: Question number * 3 - 3, example question 2 is 2*3-3= index 3
            console.log("why this run");
        } else {
            console.log("UpdateAnswer sent unexpected value of answer to a question");
        }

         */



    }

    const toQuestion = () => {
        navigate('/home')
    }

    const optionOneClick = () => {
        setActive1(!active1);
        setActive2(false);
        setActive3(false);
        setActive4(false);

        //Check if an answer already has been made, and in that case change it.
        if (answers.length >= UpdateAnswer()*3-3+1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer()*3-3+1).toString());

            var index = UpdateAnswer()*3-3;
            console.log("Index is:: " + index.toString());
            console.log(answers);
            //answers = setCharAt(answers,index,'1');
            setAnswers(setCharAt(answers,index,'1') )
            console.log(answers);

        } else {
            setAnswers(answers + "1, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!):: " + answers);

        //toNextQuestion();
    }

    const optionTwoClick = () => {

        setActive1(false);
        setActive2(!active2);
        setActive3(false);
        setActive4(false);

        //Check if an answer already has been made, and in that case change it.
        if (answers.length >= UpdateAnswer()*3-3+1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer()*3-3+1).toString());

            var index = UpdateAnswer()*3-3;
            console.log("Index is:: " + index.toString());
            console.log(answers);
            //answers = setCharAt(answers,index,'2');
            setAnswers(setCharAt(answers,index,'2') )
            console.log(answers);

        } else {
            setAnswers(answers + "2, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!):: " + answers);
        //toNextQuestion();
    }

    const optionThreeClick = () => {
        setActive1(false);
        setActive2(false);
        setActive3(!active3);
        setActive4(false);

        //Check if an answer already has been made, and in that case change it.
        if (answers.length >= UpdateAnswer()*3-3+1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer()*3-3+1).toString());

            var index = UpdateAnswer()*3-3;
            console.log("Index is:: " + index.toString());
            console.log(answers);
            //answers = setCharAt(answers,index,'3');
            setAnswers(setCharAt(answers,index,'3') )
            console.log(answers);

        } else {
            setAnswers(answers + "3, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!):: " + answers);
        //toNextQuestion();
    }
    const optionFourClick = () => {
        setActive1(false);
        setActive2(false);
        setActive3(false);
        setActive4(!active4);

        //Check if an answer already has been made, and in that case change it.
        if (answers.length >= UpdateAnswer()*3-3+1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer()*3-3+1).toString());

            var index = UpdateAnswer()*3-3;
            console.log("Index is:: " + index.toString());
            console.log(answers);
            //answers = setCharAt(answers,index,'4');
            setAnswers(setCharAt(answers,index,'4') )
            console.log(answers);

        } else {
            setAnswers(answers + "4, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!):: " + answers);
        //toNextQuestion();
    }


//THIS IS BORROWED FROM, DELETE LATER ONLY FOR TEST  https://github.com/davidrazmadzeExtra/Multiple_Choice_Quiz_ReactJS/blob/main/src/App.js
    const questions = [
        {
            text: "What is the capital of America?",
            options: [
                {id: 0, text: "New York City", isCorrect: false},
                {id: 1, text: "Boston", isCorrect: false},
                {id: 2, text: "Santa Fe", isCorrect: false},
                {id: 3, text: "Washington DC", isCorrect: true},
            ],
        },
        {
            text: "What year was the Constitution of America written?",
            options: [
                {id: 0, text: "1787", isCorrect: true},
                {id: 1, text: "1776", isCorrect: false},
                {id: 2, text: "1774", isCorrect: false},
                {id: 3, text: "1826", isCorrect: false},
            ],
        },
        {
            text: "Who was the second president of the US?",
            options: [
                {id: 0, text: "John Adams", isCorrect: true},
                {id: 1, text: "Paul Revere", isCorrect: false},
                {id: 2, text: "Thomas Jefferson", isCorrect: false},
                {id: 3, text: "Benjamin Franklin", isCorrect: false},
            ],
        },
        {
            text: "What is the largest state in the US?",
            options: [
                {id: 0, text: "California", isCorrect: false},
                {id: 1, text: "Alaska", isCorrect: true},
                {id: 2, text: "Texas", isCorrect: false},
                {id: 3, text: "Montana", isCorrect: false},
            ],
        },
        {
            text: "Which of the following countries DO NOT border the US?",
            options: [
                {id: 0, text: "Canada", isCorrect: false},
                {id: 1, text: "Russia", isCorrect: true},
                {id: 2, text: "Cuba", isCorrect: true},
                {id: 3, text: "Mexico", isCorrect: false},
            ],
        },
    ];

    //THIS IS BORROWED FROM, DELETE LATER ONLY FOR TEST  https://github.com/davidrazmadzeExtra/Multiple_Choice_Quiz_ReactJS/blob/main/src/App.js
    const [currentQuestion, setCurrentQuestion] = useState(0);
    /* A possible answer was clicked */

    //THIS IS BORROWED FROM, DELETE LATER ONLY FOR TEST  https://github.com/davidrazmadzeExtra/Multiple_Choice_Quiz_ReactJS/blob/main/src/App.js
    const optionClicked = (isCorrect) => {
        // Increment the score
        if (isCorrect) {
            //setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            //setShowResults(true);
        }
    };
    //LÅNT SLUT


    return (

        <div>
            <Helmet>
                <title>NEM Læringsplatform | Quiz</title>
            </Helmet>

            <div>
                <img onClick={toHome} src={logo} alt="logo" className="logo"/>
                <div className={"right"}>Velkommen {username}</div>
            </div>

            <div className={"center_p"}>
                <div>
                    <div
                        style={{display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: "100px"}}
                    ><h1>{quizObject.courseName}</h1></div>
                </div>
                <div>
                    <h3 style={{display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: "0px"}} > 1: {eval(questionFromParam)} </h3>
                    <div>
                        <ul >
                            <Button name={"option1"} style={{backgroundColor: active1 ? "lightgray" : ""}}
                                    onClick={optionOneClick}>{quizObject.answer1}</Button>
                            <Button name={"option2"} style={{backgroundColor: active2 ? "lightgray" : ""}}
                                    onClick={optionTwoClick}>{quizObject.answer1}</Button>
                            <Button name={"option3"} style={{backgroundColor: active3 ? "lightgray" : ""}}
                                    onClick={optionThreeClick}>{quizObject.answer2}</Button>
                            <Button name={"option4"} style={{backgroundColor: active4 ? "lightgray" : ""}}
                                    onClick={optionFourClick}>{quizObject.answer3}</Button>

                        </ul>
                    </div>
                </div>
                {/**/}<div>
                    <button onClick={toPrevQuestion}>Tilbage</button>
                    <button onClick={toNextQuestion}>Frem</button>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: "30px",
                }}>
                    {/*<button onClick={toQuizzes}>Gem og luk</button> */}
                    <button onClick={toQuizzes}>Afslut quiz</button>
                </div>

                {/* //THIS IS BORROWED FROM, DELETE LATER ONLY FOR TEST  https://github.com/davidrazmadzeExtra/Multiple_Choice_Quiz_ReactJS/blob/main/src/App.js*/}
                {/*
                <ul>
                    {questions[currentQuestion].options.map((option) => <label key={option}>
                        <input
                            value={option.id}
                        /> {option.text}
                    </label>)})}
                </ul>
                */}

            </div>
        </div>
    );

}

export default Quiz;