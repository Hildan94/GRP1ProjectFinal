import {useNavigate} from "react-router-dom";
import {React, useState} from "react";
import {Helmet} from 'react-helmet';
import logo from "./../image/NEM_logo_noBackground2.png";
import './../Backend/quiz.css';
import {useSearchParams} from "react-router-dom";
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

var currUserId, username;
var quizObject = [];
var db_quiz_questionsObject = [];
var questionsObject = [];

var userObject = {
    "id": currUserId = 11337,
    "username": username = 'Dennis'
}

function db_getQuiz_old() {
    var retryCount = 0;

    tokenizedAxios.get(`/api/quizresult/quiz`).then((response) => {
        quizObject = response.data;
        console.log(response.data);
        console.log("HERE");
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
                    console.log(response.data);
                    console.log(quizObject)
                }).catch(function (error) {
                    if (error.response) { //if error, print info
                        console.log(error.response.data.title);
                        console.log(error.response.status);
                        console.log(error.response.data);
                    }
                })
            }
        }
    })
}


function UpdateAnswer() {

    //Get the correct current question number without unnecessary re-renders
    var currPathHash = window.location.hash.toString();
    var currPath = currPathHash.slice(1);
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

    //to be used in api data
    const [getQuizAPI, setgetQuizAPI] = useState(false); //is the API call done
    const [getQuestionsAPI, setgetQuestionsAPI] = useState(false); //is the API call done
    const [getQuizQuestionsAPI, setgetQuizQuestionsAPI] = useState(false); //is the API call done
    const [updateData, setUpdateData] = useState(false); //not api, but updates internally used states once api's are loaded

    //const [questionNav, setQuestionNav] = useState(1); //for navigation purposes attempt
    const [answers, setAnswers] = useState(''); //to store all answers. Be aware this is only updated correctly after it has been updated
    const [answersArr, setAnswersArr] = useState([]); //to store all answers. TEST to be used in viewing answers when done.
    const [quizName, setQuizName] = useState([]); //used to get quiz name

    const [dbquestionsNo, setdbQuestionsNo] = useState([]) //save the question id's for the currently selected quiz
    const [dbquestions, setdbQuestions] = useState([]); //save all the questions for currently selected quiz

    const [searchParams] = useSearchParams();
    var currPathHash = window.location.hash.toString();
    var currPath = currPathHash.slice(1);
    const params = new URLSearchParams(currPath);

    var pathParams = currPath.substring(currPath.indexOf('/') + 6);
    var paramQuizId = pathParams.slice(0, 3); //can only be used if quizid is a fixed length, which it may not
    var paramQuestionId = pathParams.substring(pathParams.indexOf('/') + 1);

    var questionFromParam = 'quizObject_old.question' + (paramQuestionId - 100);


    const navigate = useNavigate()


    const db_getQuiz = () => {
        var retryCount = 0;

        tokenizedAxios.get(`/api/quizresult/quiz`).then((response) => {
            quizObject = response.data;
            console.log(response.data);
            console.log("1 DOES THIS RUN FIRST OR ");
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
                        console.log(response.data);
                        console.log("1 DOES THIS RUN FIRST OR ");
                        setgetQuizAPI(true);
                        console.log(quizObject)
                    }).catch(function (error) {
                        if (error.response) { //if error, print info
                            console.log(error.response.data.title);
                            console.log(error.response.status);
                            console.log(error.response.data);
                        }
                    })
                }
            }
        })
        //console.log("2 DOES THIS RUN FIRST?"); //THIS RUNS CONSIDERABLY EARLIER..
    }


    const db_getQuestions = () => { //local object: questionsObject
        var retryCount = 0;

        tokenizedAxios.get(`/api/quizresult/questions`).then((response) => {
            questionsObject = response.data;
            console.log(response.data);
            console.log("1 DOES THIS RUN FIRST OR ");
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
                        console.log(response.data);
                        console.log("1 DOES THIS RUN FIRST OR ");
                        setgetQuestionsAPI(true);
                        console.log(questionsObject)
                    }).catch(function (error) {
                        if (error.response) { //if error, print info
                            console.log(error.response.data.title);
                            console.log(error.response.status);
                            console.log(error.response.data);
                        }
                    })
                }
            }
        })
    }

    const db_getQuiz_Questions = () => { //local object: db_quiz_questionsObject
        var retryCount = 0;

        tokenizedAxios.get(`/api/quizresult/quizquestions`).then((response) => {
            db_quiz_questionsObject = response.data;
            console.log(response.data);
            console.log("1 DOES THIS RUN FIRST OR ");
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
                        console.log(response.data);
                        console.log("1 DOES THIS RUN FIRST OR ");
                        setgetQuizQuestionsAPI(true);
                        console.log(db_quiz_questionsObject)
                    }).catch(function (error) {
                        if (error.response) { //if error, print info
                            console.log(error.response.data.title);
                            console.log(error.response.status);
                            console.log(error.response.data);
                        }
                    })
                }
            }
        })
    }


    const db_postQuizResults = () => {
        var retryCount = 0;

        var object = {
            "quizid": parseInt(paramQuizId),
            "selectedAnswers": answers,
            "userid": 1213
        }

        tokenizedAxios.post(`/api/quizresult`, object).then((response) => console.log(response.data)).catch(function (error) { //if error retry due to current bug
            if (error.response) {
                retryCount++;
                if (retryCount > 1) {
                    console.log(error.response.data.title);
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    tokenizedAxios.post(`/api/quizresult`, object).then((response) => console.log(response.data)).catch(function (error) {
                        if (error.response) { //if error, print info
                            console.log(error.response.data.title);
                            console.log(error.response.status);
                            console.log(error.response.data);
                        }
                    })
                }
            }
        })
    }


    const quizInit = () => {
        //console.log("quizinit start run");
        if (dbquestions.length === 0) { //only do this once
            //console.log("quizinit within loop run");
            //getDataFromDb();
            getQuestionNumbers();
            getQuestions();
            updateQuizName();
        }
    }

    const apitest = () => {
        console.log("LOG 1: ")
        console.log(quizObject)
        console.log(quizObject[0].id.toString())
        console.log(quizObject[0].category.toString())

        console.log("LOG 2:");
        console.log(dbquestions) //empty array? may be because only the first method in quiz init is done right
    }

    const updateQuizName = () => {
        //console.log("Paramquizid: " + paramQuizId + ". .")
        var quiznumberFromParam = parseInt(paramQuizId); // 752;
        var quizCategory = quizObject.find(x => x.id === quiznumberFromParam)
        //console.log(quizCategory); //entire object
        console.log("This is : " + quizCategory.category);

        quizName.push({ // add quizname to state array
            category: quizCategory.category,
        });

    }

    const getDataFromDb = () => {
        console.log("<><><><><><>POINT 1")
        db_getQuiz();
        console.log(quizObject)

        console.log("<><><><><><>POINT 2")
        db_getQuestions();
        console.log("<><><><><><>POINT 3")
        db_getQuiz_Questions();
        console.log("<><><><><><>POINT 4")

    }

    const saveQuizToDb = () => {
        navigate('/quizzes') //when data is saved navigate back to quizzes
    }


    //Saves list of id's of the questions of current quiz to dbQuestionsNo state
    const getQuestionNumbers = () => { //works as intended || After API Work
        const testQuizId = paramQuizId; //452;

        console.log("getQuestionNumbers debugging0 : ");
        console.log(db_quiz_questionsObject);
        console.log("getQuestionNumbers debugging1 : " + db_quiz_questionsObject.length);
        console.log("getQuestionNumbers debugging2 : " + db_quiz_questionsObject[0].quiz_id);
        console.log("getQuestionNumbers debugging3 : " + testQuizId.toString());
        console.log("getQuestionNumbers debugging4 : " + db_quiz_questionsObject[0].questionslist_id.toString())
        console.log(dbquestionsNo)

        for (let i = 0; i < db_quiz_questionsObject.length; i++) {
            console.log("Value I is: " + i.toString())
            if (db_quiz_questionsObject[i].quiz_id.toString() === testQuizId.toString()) {
                console.log("DO I EVER GO HERE?");
                console.log(db_quiz_questionsObject[i].questionslist_id.toString())
                console.log("<<< INDEX " + i.toString() + " TRUE");

                dbquestionsNo.push({
                    id: db_quiz_questionsObject[i].questionslist_id.toString(),
                });


                //console.log("Mit arrays værdi er " + dbquestionsNo[i].id); //this breaks the last quiz
                console.log("Never get here right?");
                console.log(dbquestionsNo);
            }

            /*if (i++ === db_quiz_questionsObject.length) { //should not run anymore
                console.log("JOE does this happen?");
                getQuestions();
            }

             */
        }

    }

    //Saves the array of questions to be taken
    const getQuestions = () => {

        console.log("QUESTIONS METHOD NOW");
        console.log(questionsObject.length)
        console.log("QUestions 1: " + questionsObject[0].id.toString())
        console.log(dbquestionsNo[0].id.toString())

        for (let i = 0; i < questionsObject.length; i++) {
            for (let j = 0; j < dbquestionsNo.length; j++) { //only search for the indexes where we expect to have questions. Fx 2 questions, dont look at 3
                if (questionsObject[i].id.toString() === dbquestionsNo[j].id.toString()) {

                    if (!dbquestions.includes(questionsObject[i].id)) { //only add if not already added
                        console.log("new question added")
                        console.log(dbquestions);
                        dbquestions.push({ // add question to dbquestions state
                            questionName: questionsObject[i].questionName,
                            correctanswer: questionsObject[i].correctanswer + 1, //BE AWARE IN THIS DB TABLE CORRECT ANSWERS ARE INDEXED FROM 0-3, AND NOT 1-4. caps or no caps?
                            id: questionsObject[i].id,
                            answerA: questionsObject[i].answerA,
                            answerB: questionsObject[i].answerB,
                            answerC: questionsObject[i].answerC,
                            answerD: questionsObject[i].answerD,
                        });
                    }
                    //console.log("Mit Questions arrays værdi er " + dbquestions[j].questionId);
                }
            }
            console.log("THIS IS DBQUESTIONS");
            console.log(dbquestions);
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

        //get all your answers in an array
        for (let i = 1; i < dbquestionsNo.length + 1; i++) {
            answersArr.push({
                id: answers.charAt(i * 3 - 3),
            });
        }
        console.log(answersArr);

        //alert("full");
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
                setAnswers(setCharAt(answers, index, '0'))
                console.log(answers);
            } else {
                setAnswers(answers + "0, "); //add answer to state of answers
            }
        }

        if (paramQuestionId - 100 === dbquestions.length) { //there are no more questions, end quiz
            db_postQuizResults(); //send quiz info to db
            console.log("<<<<<<<>>>>>>");
            console.log(answers);
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
            setAnswers(setCharAt(answers, index, '1'))
            console.log(answers);

        } else {
            setAnswers(answers + "1, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!):: " + answers);
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
            setAnswers(setCharAt(answers, index, '2'))
            console.log(answers);

        } else {
            setAnswers(answers + "2, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!):: " + answers);
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
            setAnswers(setCharAt(answers, index, '3'))
            console.log(answers);

        } else {
            setAnswers(answers + "3, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!):: " + answers);
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
            setAnswers(setCharAt(answers, index, '4'))
            console.log(answers);

        } else {
            setAnswers(answers + "4, "); //add answer to state of answers
        }
        console.log("Answers list (one behind!):: " + answers);
    }
    if (!getQuizAPI || !getQuestionsAPI || !getQuizQuestionsAPI) { // {
        console.log("This sad part gets loaded cause not all states are changed");
        return (
            <div onLoad={getDataFromDb()}>
                <h1>Quiz loader.. </h1>
                <button onClick={getDataFromDb()}>KLik her hvis ikke du føres automatisk videre</button>
            </div>
        );
    } /*else if (!updateData) {

    }
    */

    else if (!end) { // Quiz ongoing
        return (

            <div onLoad={quizInit()}>
                <Helmet>
                    <title>NEM Læringsplatform | Quiz</title>
                </Helmet>

                <div>
                    <img onClick={toHome} src={logo} alt="logo" className="logo"/>
                    <div className={"right"}>Velkommen {username}</div>
                    <h1>{}</h1>
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
                        ><h1>{quizName[0].category/*quizObject.category*/}</h1></div>
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
                        <button onClick={apitest}>TEST</button>
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
                    }} onClick={saveQuizToDb}>Gem og luk
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