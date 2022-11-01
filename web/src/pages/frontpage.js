import {observer} from "mobx-react-lite";
import anime from "animejs";
import {useEffect} from "react";
import './../Backend/frontpage.css';
import profile from "./../image/a.png";
import email from "./../image/email.png";
import pass from "./../image/pass.png";

function Frontpage() {
        return (
            <div className="main">
                <div className="sub-main">
                    <div>
                        <div className="img">
                            <div className="container-image">
                                <img src={profile} alt="profile" className="profile"/>

                            </div>

                        </div>
                        <div>
                            <h1>Login Page</h1>
                            <div>
                                <img src={email} alt="email" className="email"/>
                                <input type="text" placeholder="User name" className="name"/>
                            </div>
                            <div className="second-input">
                                <img src={pass} alt="pass" className="email"/>
                                <input type="password" placeholder="Password" className="name"/>
                            </div>
                            <div className="login-button">
                                <button>Login</button>
                            </div>

                            <p className="link">
                                <a href="#">Forgot password?</a> Or <a href="#"> Sign Up </a>
                            </p>


                        </div>
                    </div>


                </div>
            </div>
        );
    }

export default Frontpage;