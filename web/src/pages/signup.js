import {useNavigate} from "react-router-dom";
import {React} from "react";
import {Button, TextField} from "@mui/material";

/**
 * Page for signing up to use the site. When a user signs up they are to be assigned a unique ID.
 *
 * The className attribute is used to specify a CSS class
 * */

function Signup() {

    const navigate = useNavigate()

    const toHome = () => { // Startside
        navigate('/home')
    }

    const toFrontpage = () => { // Loginside
        navigate('/')
    }

    return (
        <div className="main">
            <div className={"sub-main"}>
                <div>

                    <h1>Opret ny bruger</h1>

                    <div>
                        <input type="text" placeholder="Fornavn" className="name"/>
                    </div>
                    <div className="second-input">
                        <input type="text" placeholder="Efternavn" className="name"/>
                    </div>
                    <div className="second-input">
                        <input type="text" placeholder="Skole" className="name"/>
                    </div>
                    <div className="second-input">
                        <input type="text" placeholder="Klassetrin" className="name"/>
                    </div>
                    <div className="second-input">
                        <input type="text" placeholder="Kodeord" className="name"/>
                    </div>
                    <div className="second-input">
                        <input type="text" placeholder="Bekræft kodeord" className="name"/>
                    </div>

                    <div className="login-button">
                        <button onClick={toHome}>Opret bruger</button>
                    </div>
                    <p className="link">
                        <a href="/">Allerede oprettet?</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;

/*

<div>
    <button onClick={toFrontpage}>Allerede oprettet?</button>
</div>
* */

/*
<div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
</div>
* */