import './../Backend/frontpage.css';
import profile from "./../image/a.png";
import email from "./../image/email.png";
import pass from "./../image/pass.png";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";


function Frontpage() {

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/home')
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
                            <h1>Login side</h1>
                            <div>
                                <img src={email} alt="email" className="email"/>
                                <input type="text" placeholder="Brugernavn" className="name"/>
                            </div>
                            <div className="second-input">
                                <img src={pass} alt="pass" className="email"/>
                                <input type="password" placeholder="Kodeord" className="name"/>
                            </div>
                            <div className="login-button">
                                <button onClick={toHome}>Login</button>
                            </div>

                            <p className="link">
                                <a href="#">Glemt kodeord?</a> Or <a href="#">Opret bruger</a>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        );
    }

export default Frontpage;