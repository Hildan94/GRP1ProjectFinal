import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './assets/quiz.css';


const Quiz = () => {

    const navigate = useNavigate()

        //initialize:
    const [quizName, setQuizName] = useState('');
    const [category, setCategory] = useState('Matematik');
    const [questionsList, setQuestionsList] = useState([]);


    //handle submit:
    const handleSubmit = async (e) => {
        e.preventDefault();
        const quiz = {quizName, category, questionsList};
        //fetch("https://nem.grp1.diplomportal.dk/api/quiznew", {method: "POST", body: quiz, headers: {"Content-Type": "APPLICATION/JSON"}})


        try {
            const response = await fetch("http://localhost:8080/api/quiznew", {method: "POST",crossdomains: true, body: JSON.stringify(quiz), headers: {"Content-Type": "APPLICATION/JSON"}})
            const data = await response.json();
            navigate(`/questions/${data}`);
        } catch (error) {
            alert("Der skete en fejl ):")
        }

        console.log(quiz);
    };

    return (
        <div className="Quiz">
            <form id="quiz" onSubmit={handleSubmit}>
                    <label>Quiz navn</label>
                <input
                    type="text"
                    value={quizName}
                    name="Quizname"
                    required
                    onChange={(e) => setQuizName(e.target.value)}>
                </input>

                <label>Kategori</label>
                    <select
                        value={category}
                        name="Category"
                        required
                        onChange={(e) => setCategory(e.target.value)}>

                        <option value="Matematik">Matematik</option>
                        <option value="Dansk">Dansk</option>
                        <option value="Historie">Historie</option>
                        <option value="Geografi">Geografi</option>
                    </select>
                <button type="submit">Opret quiz</button>
            </form>
        </div>
    );
}
export default Quiz;