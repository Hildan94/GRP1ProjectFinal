import {useNavigate} from "react-router-dom";
import {React} from "react";

function Reports() {

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/home')
    }



    return (
        <div>
            <div>
                <h1>NEM Læringsplatform </h1>
                <button onClick={toHome}> Hjem</button>
            </div>
            <div>
                <h1> Matematik </h1>
                <h2> Tryk på den ønskede quiz at generere rapport ud fra</h2>
            </div>
            <div>
                <button> Quiz 1 blok</button>
            </div>
            <div>
                <button>Generer rapport</button>
            </div>
        </div>
    );

}

export default Reports;