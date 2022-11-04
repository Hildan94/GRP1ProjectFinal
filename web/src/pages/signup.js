import {useNavigate} from "react-router-dom";
import {React} from "react";
import { Helmet } from 'react-helmet';

function Signup() {

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/home')
    }

    const toFrontpage = () => {
        navigate('/')
    }

    return (
        <div>
            <Helmet>
                <title>NEM Læringsplatform | Tilmeld</title>
            </Helmet>
            <div>
                <form>
                    <label>
                        Brugernavn
                        <input type="text" name="username"/>
                    </label>
                </form>
                <form>
                    <label>
                        Fulde navn
                        <input type="text" name="name"/>
                    </label>
                </form>
                <form>
                    <label>
                        Skole
                        <input type="text" name="school"/>
                    </label>
                </form>
                <form>
                    <label>
                        Klassetrin
                        <input type="text" name="gradeno"/>
                    </label>
                </form>
                <form>
                    <label>
                        Kodeord
                        <input type="text" name="password"/>
                    </label>
                </form>
                <form>
                    <label>
                        Gentag kodeord
                        <input type="text" name="passwordconfirm"/>
                    </label>
                </form>
            </div>
            <div>
                <button onClick={toHome}>Opret bruger</button>
            </div>
            <div>
                <button onClick={toFrontpage}>Tilbage</button>
            </div>
        </div>
    );

}

export default Signup;