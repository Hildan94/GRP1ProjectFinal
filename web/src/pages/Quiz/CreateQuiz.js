import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './assets/createQuiz.css';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';


const Quiz = () => {

    const navigate = useNavigate()

    const baseUrl = process.env.NODE_ENV === 'development' ?
        "http://localhost:8080/":"" //Check if dev environment

        //initialize:
    const [quizName, setQuizName] = useState('');
    const [category, setCategory] = useState('Matematik');
    const [children, setChildren] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    //handle submit:
    const handleSubmit = async (e) => {
        e.preventDefault();
        const quiz = {quizName, category, children};
        //fetch("https://nem.grp1.diplomportal.dk/api/quiznew", {method: "POST",crossdomains: true, body: quiz, headers: {"Content-Type": "APPLICATION/JSON"}})
        //http://localhost:8080/api/quiznew
        setIsLoading(true);
        try {
            const response = await fetch(baseUrl + "api/quiznew", {method: 'POST', body: JSON.stringify(quiz), headers: {Authorization : localStorage.getItem('userToken'), "Content-Type": "APPLICATION/JSON"}})
            const data = await response.json();
            setIsLoading(false);
            navigate(`/questions/${data}`);
        } catch (error) {
            setIsLoading(false);
            alert("Der skete en fejl ):")
        }

        console.log(quiz);
    };

    return (
        <div className="Quiz" id="quiz_container">
            <form id="quiz" onSubmit={handleSubmit}>
                    <label>Quiz navn</label>
                <input className="Quiz"
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
                {isLoading? <CircularProgress/>:<></>}
                <Button name="createQuiz" disabled={isLoading} type="submit">Opret quiz</Button>
            </form>
        </div>
    );
}
export default Quiz;