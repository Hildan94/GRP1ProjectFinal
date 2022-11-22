import {makeAutoObservable, runInAction} from "mobx";
import Report from "./Report";


const baseUrl = process.env.NODE_ENV === 'development' ?
    "https://localhost:8080/":""; //Check if dev environment

class ReportsFetcher {
    report = ["Loadin"];

    constructor() {
        makeAutoObservable(this,{},{autoBind:true});
        //this.fetchReport();
        this.fetchReports();
    }


    fetchReports() {
        fetch(baseUrl + "api/reports",{
            method: 'GET',
            headers :{
                Authorization : localStorage.getItem('userToken')
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
     * //TODO: Implement this and FIIIX
     */

    fetchReport(key){
        fetch(baseUrl + 'api/reports/report?id=' + key,{
            method: 'GET',
            headers :{
                Authorization : localStorage.getItem('userToken')

            },
        })
            .then(
            (response) => response.json().then(
                (json) => runInAction(() => this.report = json)
            )
        )

    }
}

export const scores = new ReportsFetcher();