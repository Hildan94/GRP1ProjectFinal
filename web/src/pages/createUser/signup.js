import {useNavigate} from "react-router-dom";
import {React, useState} from "react";
import {userStore} from "./signupFetcher";

/**
 * Page for signing up to use the site. When a user signs up they are to be assigned a unique ID.
 *
 * The className attribute is used to specify a CSS class
 *
 * Confirm pw validation from:
 * https://www.cluemediator.com/password-and-confirm-password-validation-in-react#daf
 *
 * https://reactjs.org/docs/forms.html
 * */
{/* validateInput is used when the input field is out of focus, and when passwords aren't matchin*/}

function Signup() {

    const navigate = useNavigate()

    const toFrontpage = () => { // Login page
        navigate('/')
    }

    const [input, setInput] = useState({
        username: '',
        surname: '',
        school: '',
        grade: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({
        username: '',
        surname: '',
        school: '',
        grade: '',
        password: '',
        confirmPassword: ''
    })

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [hash, setHash] = useState('');

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
        validateInput(e);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {"username":userName, "password":passWord, "hash":hash};

        try {
            userStore.addUser({"username":userName, "password":passWord, "hash":hash})
            toFrontpage();
        } catch (error) {
            alert("Fejl")
        }

        console.log(newUser);
    };

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "username":
                    if (!value) {
                        stateObj[name] = "Indtast fornavn";
                    }
                    break;

                case "surname":
                    if (!value) {
                        stateObj[name] = "Indtast efternavn";
                    }
                    break;

                case "school":
                    if (!value) {
                        stateObj[name] = "Indtast skole";
                    }
                    break;

                case "grade":
                    if (!value) {
                        stateObj[name] = "Indtast klassetrin";
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Indtast kodeord";
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Kodeord og Bekræft kodeord matcher ikke";
                    } else {
                        stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Indtast bekræft kode";
                    } else if (passWord && value !== passWord) {
                        stateObj[name] = "Kodeordet matcher ikke";
                    }
                    break;

                default:
                    break;
            }
            return stateObj;
        });
    }

    return (
        <div className="main">
            <div className={"sub-main"}>
                <form onSubmit={handleSubmit}>
                    <h1>Opret ny bruger</h1>

                        <input type="text"
                               name="username"
                               placeholder="Fornavn"
                               value={userName}
                               onChange={(e) => setUserName(e.target.value)}
                               onBlur={validateInput}
                               className="name"/>
                        { error.username && <span className='err'>{error.username}</span> }

                    <div className="second-input">
                        <input type="text"
                               name="surname"
                               placeholder="Efternavn"
                               value={input.surname}
                               onChange={onInputChange}
                               onBlur={validateInput}
                               className="name"/>
                        { error.surname && <span className='err'>{error.surname}</span> }
                    </div>
                    <div className="second-input">
                        <input type="text"
                               name="school"
                               placeholder="Skole"
                               value={input.school}
                               onChange={onInputChange}
                               onBlur={validateInput}
                               className="name"/>
                        { error.school && <span className='err'>{error.school}</span> }
                    </div>
                    <div className="second-input">
                        <input type="text"
                               name="grade"
                               placeholder="Klassetrin"
                               value={input.grade}
                               onChange={onInputChange}
                               onBlur={validateInput}
                               className="name"/>
                        { error.grade && <span className='err'>{error.grade}</span> }
                    </div>
                    <div className="second-input">
                        <input type="password"
                               name="password"
                               placeholder="Kodeord"
                               value={passWord}
                               required
                               onChange={(e) => setPassWord(e.target.value)}
                               onBlur={validateInput}
                               className="name"/>
                        { error.password && <span className='err'>{error.password}</span> }
                    </div>
                    <div className="second-input">
                        <input type="password"
                               name="confirmPassword"
                               placeholder="Bekræft kodeord"
                               value={input.confirmPassword}
                               onChange={onInputChange}
                               onBlur={validateInput}
                               className="name"/>
                        { error.confirmPassword && <span className='err'>{error.confirmPassword}</span> }
                    </div>

                    <div className="login-button">
                        <button type="submit">Opret bruger</button>
                    </div>
                    <p className="link">
                        <a href="/#/home">Allerede oprettet?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;