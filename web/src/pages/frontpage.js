




import './../Backend/frontpage.css';
import profile from "./../image/a.png";
import email from "./../image/email.png";
import pass from "./../image/pass.png";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import React, {useState} from 'react';


import {tokenStore} from "../stores/TokenStore";

function Frontpage() {

    const [Username, setUsername] = useState('Username');
    const [Password, setPassword] = useState('Password');

    const navigate = useNavigate()

    const toThirdpartLogin = () => {
        navigate('/campuslogin')
    }

    return (
        <div className="main">
            <Helmet>
                <title>NEM Læringsplatform</title>
            </Helmet>
            <div className="sub-main">
                <div>
                    <div className="img">
                        <div className="container-image">
                            <img src={profile} alt="profile" className="profile"/>
                        </div>
                    </div>
                    <div>

                        <h1>Loginside</h1>
                        <div>
                            <img src={email} alt="email" className="email"/>
                            <input
                                type="text"
                                name="Brugernavn"
                                required
                                onChange={(e) => setUsername(e.target.value)}>
                            </input>

                        </div>
                        <div className="second-input">

                            <img src={pass} alt="pass" className="email"/>
                            <input
                                type="text"
                                name="Kodeord"
                                required
                                onChange={(e) => setPassword(e.target.value)}>
                            </input>

                        </div>
                        <div className="login-button">

                            <button onClick={()=>tokenStore.doLogin(Username,Password)}>Log ind</button>
                            <button onClick={toThirdpartLogin}>Trejdepartslogin </button>
                        </div>

                        <p className="link">
                            <a href="#">Glemt kodeord</a> Or <a href="/#/signup">Opret bruger </a>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Frontpage;