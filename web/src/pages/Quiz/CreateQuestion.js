import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import './assets/createQuiz.css';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';


const Question = () => {

    const navigate = useNavigate()
    const { quizid } = useParams();
    const baseUrl = process.env.NODE_ENV === 'development' ?
        "http://localhost:8080/":""; //Check if dev environment
    //initialize:
    const [formFields, setFormFields] = useState( [
        {questionName: '', answerA: '', answerB: '', answerC:'', answerD: '', correctAnswer: '0'}
    ])

    const [isLoading, setIsLoading] = useState(false);

    //handle change in fields:
    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    //handle submit:
    const handleSubmit = async (e) => {
        e.preventDefault();
        //handle if any fields are empty
        let shouldSubmit = true;

        formFields.forEach(q => {
            if(q.questionName   === "" ||
                q.answerA       === "" ||
                q.answerB       === "" ||
                q.answerC       === "" ||
                q.answerD       === "" ||
                q.correctAnswer === ""
            ){ shouldSubmit = false; }
        });

        if(formFields.length === 0){
            alert("Du kan ikke lave en quiz uden spørgsmål!")
            return;
        }

        if(shouldSubmit === false){
            alert("Udfyld venligst alle felter før du gemmer")
            return;
        }
        setIsLoading(true);
        try {
            //https://nem.grp1.diplomportal.dk/api/quiznew
            //http://localhost:8080/api/quiznew/questions/${quizid}
            const response = await fetch(baseUrl + `api/quiznew/questions/${quizid}`, {method: "POST", body: JSON.stringify(formFields), headers: {Authorization : localStorage.getItem('userToken'), "Content-Type": "APPLICATION/JSON"}})
            const data = await response.json();
            setIsLoading(false);
            alert("Du har oprettet en quiz")
            navigate(`/quizzes`);
        } catch (error) {
            setIsLoading(false);
            alert("Der skete en fejl ):")
        }
        console.log(formFields);
    };

    //handle new question:
    const addQuestion = () => {
        let object = {
            questionName: '',
            answerA: '',
            answerB: '',
            answerC: '',
            answerD: '',
            correctAnswer: '0'
        }
        setFormFields([...formFields, object])
    }
    //handle remove new question:
    const removeQuestion = (index) => {
        let data = [...formFields];
        data.splice(index, 1);
        setFormFields(data);
    }


    return (
        <div className="Question">
            <form id="question" onSubmit={handleSubmit}>
                {formFields.map((form, index) => {
                    return (
                        <div key ={index}>
                            <label>Spørgsmål {index+1}</label>
                            <input
                                type="text"
                                value={form.questionName}
                                name="questionName"
                                required
                                onChange={event => handleFormChange(event, index)}>
                            </input>

                            <label>Svar 1</label>
                            <input
                                type="text"
                                value={form.answerA}
                                name="answerA"
                                required
                                onChange={event=> handleFormChange(event, index)}>
                            </input>

                            <label>Svar 2</label>
                            <input
                                type="text"
                                value={form.answerB}
                                name="answerB"
                                required
                                onChange={event => handleFormChange(event, index)}>
                            </input>

                            <label>Svar 3</label>
                            <input
                                type="text"
                                value={form.answerC}
                                name="answerC"
                                required
                                onChange={event => handleFormChange(event, index)}>
                            </input>

                            <label>Svar 4</label>
                            <input
                                type="text"
                                value={form.answerD}
                                name="answerD"
                                required
                                onChange={event => handleFormChange(event, index)}>
                            </input>

                            <label>Korrekt svar</label>
                            <select
                                value={form.correctAnswer}
                                name="correctAnswer"
                                required
                                onChange={event => handleFormChange(event, index)}>

                                <option value="0">Svar 1</option>
                                <option value="1">Svar 2</option>
                                <option value="2">Svar 3</option>
                                <option value="3">Svar 4</option>
                            </select>
                            <Button onClick={() => removeQuestion(index)}>Slet spørgsmål</Button>
                        </div>
                    )

                })}

                <Button onClick={addQuestion}>Opret nyt spørgsmål</Button>
                {isLoading? <CircularProgress/>:<></>}
                <Button disabled={isLoading} type="submit" onClick={handleSubmit}>Gem spørgsmål og opret quiz</Button>
            </form>
        </div>
    );
}
export default Question;