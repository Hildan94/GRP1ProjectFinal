import {useNavigate} from "react-router-dom";
import {React} from "react";
import {observer} from "mobx-react-lite";
import {scores} from "./ReportsFetcher";
import {observable} from "mobx";

function ReportsOverview() {

    let reportId = 'nan'

    function toReport(key){
        let temp = key+1
        reportId = temp.toString()
        navigate('report/' + key.toString())
    }

    const myList = observable(scores.scoresString.map((scoreName,key)=>
    <h2> Quiz {key+1} <button onClick={e => toReport(key)}> <li key = {key}>{scoreName}</li></button></h2>))

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
                <h1> Matematik resultater</h1>
                <h2>  {myList}  </h2>
                <h3> Tryk på den ønskede quiz at se rapport ud fra</h3>
            </div>
        </div>
    );

}

export default observer(ReportsOverview);