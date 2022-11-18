import {makeAutoObservable, runInAction} from "mobx";
import Report from "./Report";


const baseUrl = process.env.NODE_ENV === 'development' ?
    "http://localhost:8080/":""; //Check if dev environment

class ReportsFetcher {
    scoresString = ["YO", "Du har gjort det godt", "MOFO"];
    report = ["something"];

    constructor() {
        makeAutoObservable(this,{},{autoBind:true});
        this.fetchReport();
        this.fetchReport();
    }


    fetchReports() {
        fetch(baseUrl + "api/reports/test",{
            method: 'GET',
            headers :{
                Authorization : localStorage.getItem('girafToken')
            }
        })
            .then(
                (response) => response.json().then(
                    (json) => runInAction(() => this.report = json)
                )
            )
    }

    /**
     * Skal gå videre til den rigtige rapport og se resultater
     * //TODO: Implement this
     */

    fetchReport(key){
        fetch(baseUrl + "api/reports/" + key,{
            method: 'GET',
            headers :{
                Authorization : localStorage.getItem('girafToken')
            },
            body : JSON.stringify(key)
        })
            .then(
            (response) => response.json().then(
                (json) => runInAction(() => this.report = json)
            )
        )

    }

    addSomething(something){
       this.scoresString.push(something);
    }
}

export const scores = new ReportsFetcher();