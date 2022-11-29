import {makeAutoObservable, runInAction} from "mobx";
import {Signup} from "./signup"

const baseUrl = process.env.NODE_ENV === 'development' ?
    "http://localhost:8080/":"";


const userObject = {
    id: '1',
    username: '2',
    password: '3'
}

export class UserStore {

    //users = Signup.userObject;
    users = userObject;

    constructor() {
        makeAutoObservable(this,{},{autoBind:true});
        this.fetchUsers();
    }

    addUser = (user) => {
        //this.users.push(user);
        //return user;
        this.users = {"username":"username!", "password":"pw", "hash":"test"};
        fetch(baseUrl + 'api/users', {
            method: 'POST',
            body: JSON.stringify(this.users),
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