import {makeAutoObservable, runInAction} from "mobx";


const baseUrl = process.env.NODE_ENV === 'development' ?
    "http://localhost:8080/":""; //Check if dev environment

class ReportsStore{
    scores = ["YO", "Du har gjort det godt"];

    constructor() {
        makeAutoObservable(this,{},{autoBind:true});
        this.fetchString();
    }

    fetchString() {
        fetch(baseUrl + "api/reports").then(
            (response) => response.json().then(
                (json) => runInAction(() => this.scores= json)
            )
        )
    }

    addSomething(something){
       this.scores.push(something);
    }
}

export const scores = new ReportsStore();