import {makeAutoObservable, runInAction} from "mobx";

const baseUrl = process.env.NODE_ENV === 'development' ?
    "http://localhost:8080/":""; //Check if dev environment

class GiraffeStore {
    giraffes = ["Loading giraffes"];

    constructor() {
        makeAutoObservable(this,{},{autoBind:true});
        this.fetchGiraffes();
    }

    addGiraffe = (giraffe) => {
        this.giraffes.push(giraffe);
    }

    fetchGiraffes() {
        fetch(baseUrl + "api/giraffes").then(
            (response) => response.json().then(
                (json) => runInAction(() => this.giraffes = json)
            )
        )
    }
}


export const giraffeStore = new GiraffeStore();