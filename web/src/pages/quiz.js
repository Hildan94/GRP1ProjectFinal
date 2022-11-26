import {useNavigate} from "react-router-dom";
import {React, useState} from "react";
import {Helmet} from 'react-helmet';
import logo from "./../image/NEM_logo_noBackground2.png";
import './../Backend/quiz.css';
import Button from "@mui/material/Button";
import axios from 'axios';

const url = "http://localhost:8080"
var token = localStorage.getItem("userToken");

const tokenizedAxios = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

var currUserId, username; //userId and userName from currently logged in user
var quizObject = []; //array for quiz objects
var db_quiz_questionsObject = []; //array for quiz_questions objects
var questionsObject = []; //array for questions objects

var userObject = { //hardcoded user object
    "id": currUserId = 11337,
    "username": username = 'Dennis'
}

function UpdateAnswer() {

    //Get the correct current question number without unnecessary re-renders
    var currPathHash = window.location.hash.toString();
    var currPath = currPathHash.slice(1);
    var pathParams = currPath.substring(currPath.indexOf('/') + 6);
    var paramQuestionId = pathParams.substring(pathParams.indexOf('/') + 1);
    var questionFromParamNumber = paramQuestionId - 100;
    console.log("UpdateAnswer says current question is: " + questionFromParamNumber.toString());
    return questionFromParamNumber;

}

//Replaces a character at a specific index.
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

    const [getQuizAPI, setgetQuizAPI] = useState(false); //is the API call done
    const [getQuestionsAPI, setgetQuestionsAPI] = useState(false); //is the API call done
    const [getQuizQuestionsAPI, setgetQuizQuestionsAPI] = useState(false); //is the API call done

    const [answers, setAnswers] = useState(''); //to store all answers. Be aware this is only updated correctly after it has been updated
    const [answersArr, setAnswersArr] = useState([]); //to store all answers. TEST to be used in viewing answers when done.
    const [quizName, setQuizName] = useState([]); //used to get quiz name

    const [dbquestionsNo, setdbQuestionsNo] = useState([]) //save the question id's for the currently selected quiz
    const [dbquestions, setdbQuestions] = useState([]); //save all the questions for currently selected quiz

    var currPathHash = window.location.hash.toString(); //hash url path, like "#/quiz/802/101"
    var currPath = currPathHash.slice(1); //hash url path minus hash sign
    var pathParams = currPath.substring(currPath.indexOf('/') + 6); //url path parameters, like "802/101"
    var paramQuizId = pathParams.slice(0, 3); //quizId from path parameters, like "802". Requires quizId to be a fixed length of 3.
    var paramQuestionId = pathParams.substring(pathParams.indexOf('/') + 1); //questionId from path parameters, like "101".

    const navigate = useNavigate()

// Function to get quiz objects from database
    const db_getQuiz = () => {
        var retryCount = 0;

        //Our API has an error where the first, and sometimes second time you try you get an error. Therefore, it will be attempted 3 times
        tokenizedAxios.get(`/api/quizresult/quiz`).then((response) => {
            quizObject = response.data;
            setgetQuizAPI(true);
            console.log(quizObject)
        }).catch(function (error) { //if error retry due to current bug
            if (error.response) {
                console.log("Error in first iteration of api/quizresult/quiz call");
                retryCount++;
                if (retryCount > 1) {
                    console.log(error.response.data.title);
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    tokenizedAxios.get(`/api/quizresult/quiz`).then((response) => {
                        quizObject = response.data;
                        setgetQuizAPI(true);
                        console.log(quizObject)
                    }).catch(function (error) {
                        tokenizedAxios.get(`/api/quizresult/quiz`).then((response) => {
                            quizObject = response.data;
                            setgetQuizAPI(true);
                            console.log(quizObject)
                        }).catch(function (error) {
                            if (error.response) { //if error, print info
                                console.log(error.response.data.title);
                                console.log(error.response.status);
                                console.log(error.response.data);
                            }
                        })
                    })
                }
            }
        })
    }

//Function to get questions from db
    const db_getQuestions = () => { //local object: questionsObject
        var retryCount = 0;

        //Our API has an error where the first, and sometimes second time you try you get an error. Therefore, it will be attempted 3 times
        tokenizedAxios.get(`/api/quizresult/questions`).then((response) => {
            questionsObject = response.data;
            setgetQuestionsAPI(true);
            console.log(questionsObject)
        }).catch(function (error) { //if error retry due to current bug
            if (error.response) {
                console.log("Error in first iteration of api/quizresult/questions call");
                retryCount++;
                if (retryCount > 1) {
                    console.log(error.response.data.title);
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    tokenizedAxios.get(`/api/quizresult/questions`).then((response) => {
                        questionsObject = response.data;
                        setgetQuestionsAPI(true);
                        console.log(questionsObject)
                    }).catch(function (error) {
                         //if error, print info
                        tokenizedAxios.get(`/api/quizresult/questions`).then((response) => {
                            questionsObject = response.data;
                            setgetQuestionsAPI(true);
                            console.log(questionsObject)
                        }).catch(function (error) {
                            if (error.response) { //if error, print info
                                console.log(error.response.data.title);
                                console.log(error.response.status);
                                console.log(error.response.data);
                            }
                        })
                    })
                }
            }
        })
    }

    //Function to get Quiz_questions from db table
    const db_getQuiz_Questions = () => { //local object: db_quiz_questionsObject
        var retryCount = 0;

        //Our API has an error where the first, and sometimes second time you try you get an error. Therefore, it will be attempted 3 times
        tokenizedAxios.get(`/api/quizresult/quizquestions`).then((response) => {
            db_quiz_questionsObject = response.data;
            setgetQuizQuestionsAPI(true);
            console.log(db_quiz_questionsObject)
        }).catch(function (error) { //if error retry due to current bug
            if (error.response) {
                console.log("Error in first iteration of api/quizresult/quizquestions call");
                retryCount++;
                if (retryCount > 1) {
                    console.log(error.response.data.title);
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    tokenizedAxios.get(`/api/quizresult/quizquestions`).then((response) => {
                        db_quiz_questionsObject = response.data;
                        setgetQuizQuestionsAPI(true);
                        console.log(db_quiz_questionsObject)
                    }).catch(function (error) {
                         //if error, print info
                        tokenizedAxios.get(`/api/quizresult/quizquestions`).then((response) => {
                            db_quiz_questionsObject = response.data;
                            setgetQuizQuestionsAPI(true);
                            console.log(db_quiz_questionsObject)
                        }).catch(function (error) {
                            if (error.response) { //if error, print info
                                console.log(error.response.data.title);
                                console.log(error.response.status);
                                console.log(error.response.data);
                            }
                        })
                    })
                }
            }
        })
    }

//Function to post the results of the quiz to the db
    const db_postQuizResults = () => {
        var retryCount = 0;

        var object = {
            "quizid": parseInt(paramQuizId),
            "selectedAnswers": answers,
            "userid": 1213 //currently hardcoded userid
        }

        //Our API has an error where the first, and sometimes second time you try you get an error. Therefore, it will be attempted 3 times
        tokenizedAxios.post(`/api/quizresult`, object).then((response) => console.log(response.data)).catch(function (error) { //if error retry due to current bug
            if (error.response) {
                retryCount++;
                if (retryCount > 1) {
                    console.log(error.response.data.title);
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    tokenizedAxios.post(`/api/quizresult`, object).then((response) => console.log(response.data)).catch(function (error) {
                         //if error, print info
                        tokenizedAxios.post(`/api/quizresult`, object).then((response) => console.log(response.data)).catch(function (error) {
                            if (error.response) { //if error, print info
                                console.log(error.response.data.title);
                                console.log(error.response.status);
                                console.log(error.response.data);
                            }
                        })
                    })
                }
            }
        })
    }

    //Initializes questionNumbers, questions and quiz name to be loaded
    const quizInit = () => {
        if (dbquestions.length === 0) { //only do this once
            //getDataFromDb();
            getQuestionNumbers();
            getQuestions();
            updateQuizName();
        }
    }

    //Update quizName state
    const updateQuizName = () => {
        var quiznumberFromParam = parseInt(paramQuizId); // 752;
        var quizCategory = quizObject.find(x => x.id === quiznumberFromParam)
        //console.log(quizCategory); //entire object
        //console.log("Quiz name is: " + quizCategory.category);

        quizName.push({ // add quizname to state array
            category: quizCategory.category,
        });

    }

    //Function to call the database update functions
    const getDataFromDb = () => {
        db_getQuiz();
        db_getQuestions();
        db_getQuiz_Questions();

    }

    const endQuiz = () => {
        navigate('/quizzes') //navigate back to quizzes
    }


    //Saves list of id's of the questions of current quiz to dbQuestionsNo state
    const getQuestionNumbers = () => {
        const testQuizId = paramQuizId;

        for (let i = 0; i < db_quiz_questionsObject.length; i++) {
            if (db_quiz_questionsObject[i].quiz_id.toString() === testQuizId.toString()) {
                console.log(db_quiz_questionsObject[i].questionslist_id.toString())
                //console.log("Index: " + i.toString());

                dbquestionsNo.push({
                    id: db_quiz_questionsObject[i].questionslist_id.toString(),
                });

                //console.log("Mit arrays værdi er " + dbquestionsNo[i].id); //breaks the last quiz
                console.log(dbquestionsNo);
            }
        }
    }

    //Saves the array of questions to be taken
    const getQuestions = () => {

        for (let i = 0; i < questionsObject.length; i++) {
            for (let j = 0; j < dbquestionsNo.length; j++) { //only search for the indexes where we expect to have questions. E.g. 2 questions, don't look at 3
                if (questionsObject[i].id.toString() === dbquestionsNo[j].id.toString()) {

                    if (!dbquestions.includes(questionsObject[i].id)) { //only add if not already added
                        console.log("New question added")
                        console.log(dbquestions);
                        dbquestions.push({ // add question to dbquestions state
                            questionName: questionsObject[i].questionName,
                            correctanswer: questionsObject[i].correctanswer + 1, //In db table the correct answers are indexed from 0-3 and not 1-4. Therefore, we increment +1.
                            id: questionsObject[i].id,
                            answerA: questionsObject[i].answerA,
                            answerB: questionsObject[i].answerB,
                            answerC: questionsObject[i].answerC,
                            answerD: questionsObject[i].answerD,
                        });
                    }
                }
            }
            console.log(dbquestions);
        }
    }

    const toQuizzes = () => { //navigate to path
        navigate('/quizzes')
    }

    const toHome = () => { //navigate to path
        navigate('/home')
    }

    const endQuiz_finished = () => {
        //check if all questions have been answered
        if (active1 === active2 === active3 === active4) {  //current (last) question has not been answered
            alert("Det sidste spørgsmål er ikke besvaret");
            return;
        } else if (answers.includes("0")) { //previous question has not been answered
            alert("Et eller flere tidligere spørgsmål er ikke besvaret");
            return;
        }

        for (let i = 1; i < dbquestionsNo.length + 1; i++) { //get all your answers in an array
            answersArr.push({
                id: answers.charAt(i * 3 - 3),
            });
        }
        console.log(answersArr);

        setEnd(true); //end quiz
    }

    const endQuiz_notFinished = () => {
        navigate('/home')
    }

    const toNextQuestion = () => { //Go to next question function
        if (active1 === active2 === active3 === active4) { // no answer selected insert answer 0
            if (answers.length >= UpdateAnswer() * 3 - 3 + 1) { //add answer to state of answers
                console.log("answers.length: " + answers.length.toString());
                console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer() * 3 - 3 + 1).toString());

                var index = UpdateAnswer() * 3 - 3;
                console.log("Index is: " + index.toString());
                setAnswers(setCharAt(answers, index, '0'))
                console.log(answers);
            } else {
                setAnswers(answers + "0, "); //add no answer represented by "0" to state of answers
            }
        }

        if (paramQuestionId - 100 === dbquestions.length) { //there are no more questions, end quiz
            console.log(answers);
            endQuiz_finished();
            db_postQuizResults(); //send quiz info to db
            return;
        }

        paramQuestionId++; //increment variable for next question
        navigate(currPath.slice(0, -3) + paramQuestionId) //navigate to next question

        //reset selected question
        setActive1(false);
        setActive2(false);
        setActive3(false);
        setActive4(false);

        if (answers.length === 0) {
            //At 1st question and it has not been answered. Leave all options unchecked
        } else { //update answer box if newly navigated question already has an answer
            let answerOfQuestionIndex = UpdateAnswer() * 3 - 3 //should return answer of the first question
            console.log("answerOfQuestionIndex: " + answerOfQuestionIndex.toString());
            let answerOfQuestion = answers.charAt(answerOfQuestionIndex);
            console.log("answerOfQuestion: " + answerOfQuestion.toString());
            if (answerOfQuestion.toString() !== "0") { //have no active0 state so don't run this if it is 0
                let updateAnswerBox = 'setActive' + answerOfQuestion + '(true)'
                console.log("updateAnswerBox: " + updateAnswerBox.toString());
                eval(updateAnswerBox);
            }
        }
        console.log("ANSWERS: " + answers.toString());
        //console.log("The selected answer for this question is" + question);
    }

    const toPrevQuestion = () => { //Go to previous question function
        if (paramQuestionId > 101) { //cannot go further back than the 1st question
            paramQuestionId--;
        }
        navigate(currPath.slice(0, -3) + paramQuestionId) //navigate to question

        //reset selected question
        setActive1(false);
        setActive2(false);
        setActive3(false);
        setActive4(false);

        if (answers.length === 0) {
            //At 1st question and it has not been answered. Leave all options unchecked
        } else { //update answer box if newly navigated question already has an answer
            let answerOfQuestionIndex = UpdateAnswer() * 3 - 3 //should return answer of the first question
            console.log("answerOfQuestionIndex: " + answerOfQuestionIndex.toString());
            let answerOfQuestion = answers.charAt(answerOfQuestionIndex);
            console.log("answerOfQuestion: " + answerOfQuestion.toString());
            let updateAnswerBox = 'setActive' + answerOfQuestion + '(true)'
            console.log("updateAnswerBox: " + updateAnswerBox.toString());
            eval(updateAnswerBox);
        }
        console.log("ANSWERS: " + answers.toString());
    }

    const optionOneClick = () => { //button click answer option 1
        setActive1(!active1); //alternate clicked state on button
        setActive2(false);
        setActive3(false);
        setActive4(false);

        //Check if an answer already has been made, and in that case change it
        if (answers.length >= UpdateAnswer() * 3 - 3 + 1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer() * 3 - 3 + 1).toString());

            var index = UpdateAnswer() * 3 - 3;
            console.log("Index is:: " + index.toString());
            setAnswers(setCharAt(answers, index, '1')) //replace previous answer
            console.log(answers);

        } else {
            setAnswers(answers + "1, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!): " + answers);
    }

    const optionTwoClick = () => { //button click answer option 2

        setActive1(false);
        setActive2(!active2); //alternate clicked state on button
        setActive3(false);
        setActive4(false);

        //Check if an answer already has been made, and in that case change it.
        if (answers.length >= UpdateAnswer() * 3 - 3 + 1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer() * 3 - 3 + 1).toString());

            var index = UpdateAnswer() * 3 - 3;
            console.log("Index is:: " + index.toString());
            setAnswers(setCharAt(answers, index, '2')) //replace previous answer
            console.log(answers);

        } else {
            setAnswers(answers + "2, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!): " + answers);
    }

    const optionThreeClick = () => { //button click answer option 3
        setActive1(false);
        setActive2(false);
        setActive3(!active3); //alternate clicked state on button
        setActive4(false);

        //Check if an answer already has been made, and in that case change it.
        if (answers.length >= UpdateAnswer() * 3 - 3 + 1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer() * 3 - 3 + 1).toString());

            var index = UpdateAnswer() * 3 - 3;
            console.log("Index is:: " + index.toString());
            setAnswers(setCharAt(answers, index, '3')) //replace previous answer
            console.log(answers);

        } else {
            setAnswers(answers + "3, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!): " + answers);
    }
    const optionFourClick = () => { //button click answer option 4
        setActive1(false);
        setActive2(false);
        setActive3(false);
        setActive4(!active4); //alternate clicked state on button

        //Check if an answer already has been made, and in that case change it.
        if (answers.length >= UpdateAnswer() * 3 - 3 + 1) { //if the string of answers are equal to or greater than the index (+1 cause not index but length) where we expect an existing answer
            console.log("answers.length: " + answers.length.toString());
            console.log("UpdateAnswer()*3-3+1: " + (UpdateAnswer() * 3 - 3 + 1).toString());

            var index = UpdateAnswer() * 3 - 3;
            console.log("Index is:: " + index.toString());
            setAnswers(setCharAt(answers, index, '4')) //replace previous answer
            console.log(answers);

        } else {
            setAnswers(answers + "4, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!): " + answers);
    }

    //UI starts here
    if (!getQuizAPI || !getQuestionsAPI || !getQuizQuestionsAPI) { // If data has not been loaded from database show load screen
        return (
            <div onLoad={getDataFromDb()}>
                <h1>Quiz loader.. </h1>
                <button onClick={window.location.reload}>KLik her hvis ikke du føres automatisk videre</button>
            </div>
        );
    } else if (!end) { // Quiz ongoing
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
                                paddingBottom: "70px"
                            }}
                        ><h1>{quizName[0].category}</h1></div>
                    </div>
                    <div>
                        <h3 style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: "0px"
                        }}> {paramQuestionId - 100}: {dbquestions[paramQuestionId - 101].questionName}</h3>
                        <div style={{
                            textAlign: 'center'
                        }}>
                            <ul>
                                <Button name={"option1"} style={{backgroundColor: active1 ? "lightgray" : ""}}
                                        onClick={optionOneClick}>{dbquestions[paramQuestionId - 101].answerA}</Button>
                                <Button name={"option2"} style={{backgroundColor: active2 ? "lightgray" : ""}}
                                        onClick={optionTwoClick}>{dbquestions[paramQuestionId - 101].answerB}</Button>
                                <Button name={"option3"} style={{backgroundColor: active3 ? "lightgray" : ""}}
                                        onClick={optionThreeClick}>{dbquestions[paramQuestionId - 101].answerC}</Button>
                                <Button name={"option4"} style={{backgroundColor: active4 ? "lightgray" : ""}}
                                        onClick={optionFourClick}>{dbquestions[paramQuestionId - 101].answerD}</Button>

                            </ul>
                        </div>
                    </div>
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <button onClick={toPrevQuestion}>Tilbage</button>
                        <button onClick={toNextQuestion}>Frem</button>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: "30px",
                    }}>
                        <button style={{
                            textAlign: 'center'
                        }} onClick={toQuizzes}>Afslut quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    } else { // Quiz end
        return (

            <div>
                <div>
                    <img onClick={toHome} src={logo} alt="logo" className="logo"/>
                    <div className={"right"}>Velkommen {username}</div>
                </div>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div style={{
                    textAlign: 'center',
                }}>
                    <h1>Kanon godt gået!</h1>
                    <h3> Se nedenfor hvordan det er gået</h3>
                    <button style={{
                        textAlign: 'center'
                    }} onClick={endQuiz}>Gem og luk
                    </button>
                </div>
                <div style={{
                    textAlign: 'center',
                    listStylePosition: 'inside',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: "30px",
                    paddingBottom: '20px',
                }}>
                    {dbquestions.map(function (d, idx) {
                        return (<ul key={idx}>Spørgsmål {idx + 1 + ": " + d.questionName} <br/>
                            Dit svar: {answersArr[idx].id} | Korrekt svar: {d.correctanswer}
                            <li>Mulighed 1: {d.answerA} <br/></li>
                            <li>Mulighed 2: {d.answerB} <br/></li>
                            <li>Mulighed 3: {d.answerC} <br/></li>
                            <li>Mulighed 4: {d.answerD} <br/></li>
                        </ul>)
                    })}
                </div>
            </div>

        )
    }
}

export default Quiz;