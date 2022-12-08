import {makeAutoObservable, runInAction} from "mobx";
import {Signup} from "./signup"

const baseUrl = process.env.NODE_ENV === 'development' ?
    "http://localhost:8080/":"";


export class UserStore {

    constructor() {
        makeAutoObservable(this,{},{autoBind:true});
        //this.fetchUsers();
    }

    addUser = (user) => {
        //this.users.push(user);
        fetch(baseUrl + 'api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.getItem('userToken')
            }
        }).then(
        )
    }

    fetchUsers() {
        fetch(baseUrl + "api/users",{
            method: 'GET',
            headers: { Authorization : localStorage.getItem('userToken') }
        }).then(
            (response) => response.json().then(
                (json) => runInAction(() => this.users = json)
            )
        )
    }
}


export const userStore = new UserStore();