import {useNavigate} from "react-router-dom";
import {scores} from "./ReportsFetcher";
import {React} from "react";
import {observer} from "mobx-react-lite";


function Report(){

    const navigate = useNavigate()

    const toReports = () => {
        navigate('/reportsoverview')
    }

    return(
        <div>
            <h1> Resultater for din test
            <h2> {scores.scoresString.map((scoreName,key)=>
                <li key = {key}>{scoreName}</li>)} </h2>
            </h1>
            <button onClick={toReports} > Tryk her for at gå tilbage </button>

            <div>
                <h1>

                </h1>
            </div>

            <div>
                <form>
                    <label>
                        <input type="text" name="input" />
                    </label>

                </form>
                <button onClick={()=> scores.addSomething("FUCK")}> Lav shit </button>
            </div>
        </div>


    );
}

export default observer(Report);