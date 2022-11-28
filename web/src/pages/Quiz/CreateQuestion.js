import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import './assets/quiz.css';


const Question = () => {

    const navigate = useNavigate()
    const { quizid } = useParams();

    //initialize:
    const [formFields, setFormFields] = useState( [
        {questionName: '', answerA: '', answerB: '', answerC:'', answerD: '', correctAnswer: '0'}
    ])

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
            if(q.questionName === "") shouldSubmit = false;
            if(q.answerA === "") shouldSubmit = false;
            if(q.answerB === "") shouldSubmit = false;
            if(q.answerC === "") shouldSubmit = false;
            if(q.answerD === "") shouldSubmit = false;
            if(q.correctAnswer === "") shouldSubmit = false;
        })

        if(shouldSubmit === false){
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/quiznew/questions/${quizid}`, {method: "POST",crossdomains: true, body: JSON.stringify(formFields), headers: {"Content-Type": "APPLICATION/JSON"}})
            const data = await response.json();
            alert("Du har oprettet en quiz")
            navigate(`/quizzes`);
        } catch (error) {
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
                            <button onClick={() => removeQuestion(index)}>Slet spørgsmål</button>
                        </div>
                    )

                })}

                <button onClick={addQuestion}>Opret nyt spørgsmål</button>
                <button type="submit" onClick={handleSubmit}>Gem spørgsmål og opret quiz</button>
            </form>
        </div>
    );
}
export default Question;