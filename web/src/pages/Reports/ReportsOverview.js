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

    /*
    const report ={
        id: 1,
        quizresultat: 'Alice',
        quizrightresult: "something",
        userId: "Blabla",
        quizname: "daada",
    };
     */

    const report = scores.report

    const myListtable = observable(scores.scoresString.map((Scorename, key) =>
        <tr> <td>Quiz {key+1} </td> <td> {Scorename} </td> <td onClick={e=> toReport(key)}> Se resultat </td> </tr>))

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/home')
    }

    return (
        <div>
            <div>
                <h1>NEM Læringsplatform </h1>
                <button onClick={toHome}> Hjem</button>
            <div>
                <h1> Oversigt over resultater</h1>
                <h3> Tryk på den ønskede quiz at se rapport ud fra</h3>
            </div>
                <table>
                    <td colSpan={3} align={"center"}>
                        Matematik
                    </td>
                    {myListtable}
                </table>
            </div>
            <div>

            </div>

        </div>
    );

}

export default observer(ReportsOverview);

/*
            <div>
                {Object.values(report).map((value, index) => {
                    return (
                        <div key={index}>
                            <h2>{value}</h2>

                            <hr />
                        </div>
                    );
                })}
            </div>
 */