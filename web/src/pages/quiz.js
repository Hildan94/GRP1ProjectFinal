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

var quizIdParam = 1;

var quizObject = {
    "id": quizId = 452,
}

var db_quiz_questionsObject = [
    {
        quiz_id: "452",
        questionslist_id: "452",
    },

    {
        quiz_id: "452",
        questionslist_id: "453",
    },

    {
        quiz_id: "502",
        questionslist_id: "502",
    },

    {
        quiz_id: "502",
        questionslist_id: "503",
    },

    {
        quiz_id: "552",
        questionslist_id: "552",
    },

];

//This needs to be all the questions to the currently selected quiz. Mutate the format from db to this format.
var questionNumber = 0;
var questionsObject = [
    {
        questionName: "Hovedstad i DK?452",
        correctAnswer: 0,
        questionId: 452,
        questionNo: questionNumber++,
        answera: "Kbh",
        answerb: "Not kbh",
        answerc: "Also not kbh",
        answerd: "Especially not kbh",
    },

    {
        questionName: "Hovedstad i EN?453",
        correctAnswer: 0,
        questionId: 453,
        questionNo: questionNumber++,
        answera: "London",
        answerb: "Not London",
        answerc: "Also not London",
        answerd: "Especially not London",
    },

    {
        questionName: "Hovedstad i EN?502",
        correctAnswer: 0,
        questionId: 502,
        questionNo: questionNumber++,
        answera: "London",
        answerb: "Not London",
        answerc: "Also not London",
        answerd: "Especially not London",
    },

    {
        questionName: "Hovedstad i EN?503",
        correctAnswer: 0,
        questionId: 503,
        questionNo: questionNumber++,
        answera: "London",
        answerb: "Not London",
        answerc: "Also not London",
        answerd: "Especially not London",
    },

    {
        questionName: "Hovedstad i EN?552",
        correctAnswer: 0,
        questionId: 552,
        questionNo: questionNumber++,
        answera: "London",
        answerb: "Not London",
        answerc: "Also not London",
        answerd: "Especially not London",
    },
];

var userObject = {
    "id": currUserId = 11337,
    "username": username = 'Dennis'
}

function UpdateAnswer() {

    //Get the correct current question number without unnecessary re-renders
    var currPath = window.location.pathname;
    var pathParams = currPath.substring(currPath.indexOf('/') + 6);
    var paramQuestionId = pathParams.substring(pathParams.indexOf('/') + 1);
    var questionFromParamNumber = paramQuestionId - 100;
    console.log("UpdateAnswer says current question is: )" + questionFromParamNumber.toString());
    return questionFromParamNumber;

}

//Inspiration:  stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

function Quiz() {

    //Use these states to get answers. If active1 === true, then it is chosen, so value 1
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);

    const [end, setEnd] = useState(false); //is quiz ended

    //const [questionNav, setQuestionNav] = useState(1); //for navigation purposes attempt
    const [answers, setAnswers] = useState(''); //to store all answers. Be aware this is only updated correctly after it has been updated

    const [dbquestionsNo, setdbQuestionsNo] = useState([]) //save the question id's for the currently selected quiz
    const [dbquestions, setdbQuestions] = useState([]); //save all the questions for currently selected quiz

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(window.location.pathname);

    let selectedQuestions = 0; //should never exceed 1
    //let selectedAnswer = 0; //0 is default no answer. 1 is option 1, 2 option 2 etc.

    var currPath = window.location.pathname;
    var pathParams = currPath.substring(currPath.indexOf('/') + 6);
    var paramQuizId = pathParams.slice(0, 5);
    var paramQuestionId = pathParams.substring(pathParams.indexOf('/') + 1);

    var questionFromParam = 'quizObject_old.question' + (paramQuestionId - 100);
    let questionFromParamNumber = paramQuestionId - 100;
    console.log(questionFromParam);


    const navigate = useNavigate()


    const quizInit = () => {
        if (dbquestions.length === 0) { //only do this once
            getDataFromDb();
            getQuestionNumbers();
            getQuestions();
        }
    }

    const getDataFromDb = () => {
        //TODO: NOT YET IMPLEMENTED. Get user, questions and quiz/question table data
    }


    //Saves list of id's of the questions of current quiz to dbQuestionsNo state
    const getQuestionNumbers = () => {
        const testQuizId = 452;

        for (let i = 0; i < db_quiz_questionsObject.length; i++) {
            if (db_quiz_questionsObject[i].quiz_id === testQuizId.toString()) {
                console.log(db_quiz_questionsObject[i].questionslist_id.toString())
                console.log("<<< INDEX " + i.toString() + " TRUE");
                dbquestionsNo.push({
                    id: db_quiz_questionsObject[i].questionslist_id,
                });
                console.log("Mit arrays værdi er " + dbquestionsNo[i].id);
                console.log(dbquestionsNo);
            }
        }

    }

    //Saves the array of questions to be taken
    const getQuestions = () => {

        for (let i = 0; i < questionsObject.length; i++) {
            for (let j = 0; j < dbquestionsNo.length; j++) { //only search for the indexes where we expect to have questions. Fx 2 questions, dont look at 3
                if (questionsObject[i].questionId.toString() === dbquestionsNo[j].id.toString()) {
                    //console.log("QUIZSPØRGSMÅLETS ID: " + questionsObject[i].questionId.toString())
                    //console.log("SPM ID FRA LISTE: " + dbquestionsNo[j].id.toString())

                    if (!dbquestions.includes(questionsObject[i].questionId)) { //only add if not already added
                        console.log("new question added")
                        console.log(dbquestions);
                        dbquestions.push({ // add question to dbquestions state
                            questionName: questionsObject[i].questionName,
                            correctAnswer: questionsObject[i].correctAnswer,
                            questionId: questionsObject[i].questionId,
                            questionNo: questionsObject[i].questionNo,
                            answera: questionsObject[i].answera,
                            answerb: questionsObject[i].answerb,
                            answerc: questionsObject[i].answerc,
                            answerd: questionsObject[i].answerd,
                        });
                    }
                    //console.log("Mit Questions arrays værdi er " + dbquestions[j].questionId);
                    //console.log(dbquestions);
                }
            }
        }

    }

    const toQuizzes = () => {
        navigate('/quizzes')
    }

    const toHome = () => {
        navigate('/home')
    }

    const endQuiz_finished = () => {
        //check if all questions have been answered
        if (active1 === active2 === active3 === active4) {  //current (last) question has not been answered
            alert("This last question has not been answered");
            return;
        } else if (answers.includes("0")) { //previous question has not been answered
            alert("One or more earlier questions have not been answered");
            return;
        }
        alert("full");
        setEnd(true); //end quiz
    }

    const endQuiz_notFinished = () => {
        navigate('/home')
    }

    const toNextQuestion = () => {
        if (active1 === active2 === active3 === active4) { // no answer selected insert answer 0
            if (answers.length >= UpdateAnswer() * 3 - 3 + 1) {
                console.log("answers.length: " + answers.length.toString());
                console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer() * 3 - 3 + 1).toString());

                var index = UpdateAnswer() * 3 - 3;
                console.log("Index is:: " + index.toString());
                console.log(answers);
                //answers = setCharAt(answers,index,'0');
                setAnswers(setCharAt(answers, index, '0'))
                console.log(answers);
            } else {
                setAnswers(answers + "0, "); //add answer to state of answers
            }
        }

        if (paramQuestionId - 100 === dbquestions.length) { //there are no more questions, end quiz
            endQuiz_finished();
            return;
        }

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
            let answerOfQuestionIndex = UpdateAnswer() * 3 - 3//answers.charAt(0); //should return answer of the first question
            console.log("answerOfQuestionIndex: " + answerOfQuestionIndex.toString());
            let answerOfQuestion = answers.charAt(answerOfQuestionIndex);
            console.log("answerOfQuestion: " + answerOfQuestion.toString());
            if (answerOfQuestion.toString() !== "0") { //have no active0 state so dont run this if it is 0
                let updateAnswerBox = 'setActive' + answerOfQuestion + '(true)'
                console.log("updateAnswerBox: " + updateAnswerBox.toString());
                eval(updateAnswerBox);
            }

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
            let answerOfQuestionIndex = UpdateAnswer() * 3 - 3//answers.charAt(0); //should return answer of the first question
            console.log("answerOfQuestionIndex: " + answerOfQuestionIndex.toString());
            let answerOfQuestion = answers.charAt(answerOfQuestionIndex);
            console.log("answerOfQuestion: " + answerOfQuestion.toString());
            let updateAnswerBox = 'setActive' + answerOfQuestion + '(true)'
            console.log("updateAnswerBox: " + updateAnswerBox.toString());
            eval(updateAnswerBox);
        }

        console.log("ANSWERS: " + answers.toString());

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
        if (answers.length >= UpdateAnswer() * 3 - 3 + 1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer() * 3 - 3 + 1).toString());

            var index = UpdateAnswer() * 3 - 3;
            console.log("Index is:: " + index.toString());
            console.log(answers);
            //answers = setCharAt(answers,index,'1');
            setAnswers(setCharAt(answers, index, '1'))
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
        if (answers.length >= UpdateAnswer() * 3 - 3 + 1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer() * 3 - 3 + 1).toString());

            var index = UpdateAnswer() * 3 - 3;
            console.log("Index is:: " + index.toString());
            console.log(answers);
            //answers = setCharAt(answers,index,'2');
            setAnswers(setCharAt(answers, index, '2'))
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
        if (answers.length >= UpdateAnswer() * 3 - 3 + 1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer() * 3 - 3 + 1).toString());

            var index = UpdateAnswer() * 3 - 3;
            console.log("Index is:: " + index.toString());
            console.log(answers);
            //answers = setCharAt(answers,index,'3');
            setAnswers(setCharAt(answers, index, '3'))
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
        if (answers.length >= UpdateAnswer() * 3 - 3 + 1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer() * 3 - 3 + 1).toString());

            var index = UpdateAnswer() * 3 - 3;
            console.log("Index is:: " + index.toString());
            console.log(answers);
            //answers = setCharAt(answers,index,'4');
            setAnswers(setCharAt(answers, index, '4'))
            console.log(answers);

        } else {
            setAnswers(answers + "4, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!):: " + answers);
        //toNextQuestion();
    }

    if (!end) {
        return (

            <div onLoad={quizInit()}>
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
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingBottom: "100px"
                            }}
                        ><h1>{"Matematik 5-1_HARDCODE"}</h1></div>
                    </div>
                    <div>
                        <h3 style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: "0px"
                        }}> {paramQuestionId - 100}: {dbquestions[paramQuestionId - 101].questionName}{/*{eval(questionFromParam)*/} </h3>
                        <div>
                            <ul>
                                <Button name={"option1"} style={{backgroundColor: active1 ? "lightgray" : ""}}
                                        onClick={optionOneClick}>{dbquestions[paramQuestionId - 101].answera}</Button>
                                <Button name={"option2"} style={{backgroundColor: active2 ? "lightgray" : ""}}
                                        onClick={optionTwoClick}>{dbquestions[paramQuestionId - 101].answerb}</Button>
                                <Button name={"option3"} style={{backgroundColor: active3 ? "lightgray" : ""}}
                                        onClick={optionThreeClick}>{dbquestions[paramQuestionId - 101].answerc}</Button>
                                <Button name={"option4"} style={{backgroundColor: active4 ? "lightgray" : ""}}
                                        onClick={optionFourClick}>{dbquestions[paramQuestionId - 101].answerd}</Button>

                            </ul>
                        </div>
                    </div>
                    {/**/}
                    <div>
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
                </div>
            </div>
        );
    } else {
        return (
            <div>
                Quiz has ended
            </div>
        )
    }
}

export default Quiz;