import {useNavigate} from "react-router-dom";
import {React} from "react";
import {observer} from "mobx-react-lite";
import {scores} from "./ReportsFetcher";
import {observable} from "mobx";
import {tokenStore} from "../../stores/TokenStore";
import {Form} from "react-bootstrap";
import Button from "@mui/material/Button";


//TODO: Tokens
//TODO: Tests
//TODO: Skal køre med backend
//TODO: Skal køre rigtigt videre til de rigtige sider
//TODO: Skal ikke hardcode tabellen (måske tage størrelse af tabel fra reportsfetcheren
//TODO: Error codes
//TODO: Fix error messages
/**
 * Tror bare at tokens skal have nogle login data og så virker de
 */

function ReportsOverview() {

    function toReport(key){
        navigate('report/' + (key+1).toString())
    }

    function printToken(){
        console.log(localStorage.getItem('girafToken'))
    }

    function clearToken(){
        localStorage.removeItem('girafToken')
    }

    /**
     * Mapper hvert objekt og dets value til et table
     * /TODO : Skal vise rigtigt videre
     *
     */
    const reports = scores.report.map((reportName,outer) =>
        <tr>
            {Object.values(reportName).map((value) =>
                <td>
                    {value}
                </td>
        )}
            <td onClick={e=>toReport(outer)}> Se resultat </td>
        </tr>
    )

    /**
     * Skabelon for at lave et table for et objekt
     */
    const myListtable = observable(scores.scoresString.map((Scorename, key) =>
        <tr>
            <td>Quiz {key+1} </td>
            <td> {Scorename} </td>
            <td onClick={e=> toReport(key)}> Se resultat </td>
        </tr>))

    const navigate = useNavigate()

    const toHome = () => {
        navigate('/home')
    }

    /**
     * Overflødige knapper skal fjernes
     */

    return (
        <div>
            <div>
                <h1>NEM Læringsplatform </h1>
                <button onClick={toHome}> Hjem</button>
            <div>
                <h1> Oversigt over resultater</h1>
                <h3> Tryk på den ønskede quiz at se rapport ud fra</h3>
            </div>

            </div>
            <div>
                <table>
                    <td colSpan={6} align={"center"}>Matematik</td>
                    <tr></tr>
                        <td>quizId</td>
                        <td>quizname</td>
                        <td>quizresultat</td>
                        <td>quizrigtige</td>
                        <td>userid</td>
                        <td>Klik for at se resultater</td>

                    {reports}
                </table>
            </div>

            <div>
                <button onClick={tokenStore.doLogin}> {tokenStore.state} </button>
                <button onClick={scores.fetchReport}> Tryk for at indlæse værdier </button>
                <button onClick={printToken}> Print token </button>
                <button onClick={clearToken}> Ryd token </button>
            </div>
        </div>
    );

}

export default observer(ReportsOverview);
