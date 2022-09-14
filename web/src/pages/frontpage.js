import {React} from "react";
import {useNavigate} from "react-router-dom";

function Frontpage() {

    const navigate = useNavigate()

    const toSignup = () => {
        navigate('/signup')
    }

    const toHome = () => {
        navigate('/home')
    }

    return (
        <div>
            <div>
                <h1> NEM Læringsplatform </h1>
            </div>
            <div>
                <form>
                    <label>
                        Brugernavn
                        <input type="text" name="username"/>
                    </label>
                </form>
                <form>
                    <label>
                        Kodeord
                        <input type="text" name="password"/>
                    </label>
                </form>
            </div>
            <div>
                <button onClick={toHome}>Log ind</button>
                <button onClick={toSignup}>Opret bruger</button>
            </div>
        </div>
    );

}

export default Frontpage;