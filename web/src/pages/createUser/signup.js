import {useNavigate} from "react-router-dom";
import {React, useState} from "react";
import {userStore} from "./signupFetcher";
import {observer} from "mobx-react-lite";

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
{/* src.java.service.UserService. createUser() */}

function Signup() {

    const navigate = useNavigate()
    const toHome = () => { // Homepage of app after login
        navigate('/home')
    }
    const toFrontpage = () => { // Login page
        navigate('/')
    }

    const userObject = {
        username: '',
        password: '',
        hash: ''
    }

    const [input, setInput] = useState({
        firstname: '',
        surname: '',
        school: '',
        grade: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({
        firstname: '',
        surname: '',
        school: '',
        grade: '',
        password: '',
        confirmPassword: ''
    })

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
        validateInput(e);
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "firstname":
                    if (!value) {
                        stateObj[name] = "Indtast fornavn.";
                    }
                    break;

                case "surname":
                    if (!value) {
                        stateObj[name] = "Indtast efternavn.";
                    }
                    break;

                case "school":
                    if (!value) {
                        stateObj[name] = "Indtast skole.";
                    }
                    break;

                case "grade":
                    if (!value) {
                        stateObj[name] = "Indtast klassetrin.";
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Indtast kodeord.";
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Kodeord og Bekræft kodeord matcher ikke.";
                    } else {
                        stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Indtast bekræft kode.";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Kodeordet matcher ikke.";
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
                <form>
                    <h1>Opret ny bruger</h1>

                        <input type="text"
                               name="firstname"
                               placeholder="Fornavn"
                               value={input.firstname}
                               onChange={onInputChange}
                               onBlur={validateInput}
                               className="name"/>
                        { error.firstname && <span className='err'>{error.firstname}</span> }

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
                               value={input.password}
                               onChange={onInputChange}
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
                        <button onClick={
                            userStore.addUser("test", "test", "test")
                            //toHome
                        }>Opret bruger</button>
                    </div>
                    <p className="link">
                        <a href="/">Allerede oprettet?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;