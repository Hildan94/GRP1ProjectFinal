import {useNavigate} from "react-router-dom";
import {React} from "react";
import {Button, TextField} from "@mui/material";

function Signup() {

    const navigate = useNavigate()

    const toHome = () => { // Startside
        navigate('/home')
    }

    const toFrontpage = () => { // Loginside
        navigate('/')
    }

    return (
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <div>
                <h1>Opret ny bruger</h1>
            </div>
            <div>
                <form>
                    <label>
                        <input type="text" placeholder="  Fornavn" name="name"/>
                        <input type="text" placeholder="  Efternavn" name="name"/>
                    </label>
                </form>
                <form>
                    <label>
                        <input type="text" placeholder="   Skole" name="school"/>
                    </label>
                </form>
                <form>
                    <label>
                        <input type="text" placeholder="   Klassetrin" name="gradeno"/>
                    </label>
                </form>
                <form>
                    <label>
                        <input type="text" placeholder="   Kodeord" name="password"/>
                    </label>
                </form>
                <form>
                    <label>
                        <input type="text" placeholder="   Bekræft kodeord" name="passwordconfirm"/>
                    </label>
                </form>
            </div>
            <div>
                <button onClick={toHome}>Opret bruger</button>
            </div>
            <div>
                <button onClick={toFrontpage}>Allerede oprettet?</button>
            </div>

        </div>
    );
}

export default Signup;

/*
<div className="link">
    <a href="/">Allerede oprettet?</a>
</div>
* */