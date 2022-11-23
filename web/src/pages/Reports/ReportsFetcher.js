import {makeAutoObservable, runInAction} from "mobx";
import Report from "./Report";
import ReportObject from "./ReportObject";


const baseUrl = process.env.NODE_ENV === 'development' ?
    "http://localhost:8080/":""; //Check if dev environment

class ReportsFetcher {
    report = ["     "];

    report1 = ReportObject;

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

    reqeustCreateReport(){
        this.report1.idUser = 'haha'
        this.report1.quizResultTotalQuestion = '2'
        this.report1.quizRightResult = '1'
        fetch(baseUrl + 'api/reports/test', {
            method: 'POST',
            body:JSON.stringify(this.report1),
            headers :{
                'Content-Type' : 'application/json'
            }
        }).then()
    }
}

export const scores = new ReportsFetcher();