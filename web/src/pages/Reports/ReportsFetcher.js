import {makeAutoObservable, runInAction} from "mobx";


const baseUrl = process.env.NODE_ENV === 'development' ?
    "http://localhost:8080/":""; //Check if dev environment

class ReportsFetcher {
    scoresString = ["YO", "Du har gjort det godt", "MOFO"];

    constructor() {
        makeAutoObservable(this,{},{autoBind:true});
        this.fetchString();
    }

    fetchString() {
        fetch(baseUrl + "api/reports").then(
            (response) => response.json().then(
                (json) => runInAction(() => this.scoresString= json)
            )
        )
    }

    addSomething(something){
       this.scoresString.push(something);
    }
}

export const scores = new ReportsFetcher();