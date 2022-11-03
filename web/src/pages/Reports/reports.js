import {useNavigate} from "react-router-dom";
import {React} from "react";
import {observer} from "mobx-react-lite";
import {makeAutoObservable, runInAction} from "mobx";
import {giraffeStore} from "../GiraffeStore";
import {scores} from "./reportsStore";

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
                {scores.scores.map((scoreName,key)=>
                    <li key = {key}>{scoreName}</li>)}
            </div>
            <div>
                <form>
                    <label>
                        Input liste
                        <input type="text" name="password"/>
                    </label>

                </form>
                <button onClick={()=> scores.addSomething("LALA")}> Lav shit </button>
            </div>
        </div>
    );

}

export default observer(Reports);