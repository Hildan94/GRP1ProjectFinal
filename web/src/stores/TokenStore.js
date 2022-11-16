import {makeAutoObservable} from "mobx";
const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:8080/":""; //Check if dev

const Loginstates = {LOGGING_IN:"Loading", LOGGEDOUT:"Logout", LOGGED_IN:"LoggedIn"};
class TokenStore {
    state = Loginstates.LOGGEDOUT;
    token = null;
    logindata = {username: "", password: ""};
    states;

    constructor() {
        this.token = localStorage.getItem("girafToken")
        makeAutoObservable(this)
        //Validate if token is still good and keep/discard token and set state
    }

    doLogin() {
        this.state = Loginstates.LOGGING_IN;
        fetch(baseUrl + "api/login", {
            method: "POST",
            body: JSON.stringify(this.logindata),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            (response) => {
                response.text().then(
                    (token) => {
                        console.log("Got Token: " + token)
                        this.token = token;
                        localStorage.setItem("girafToken", token);
                        this.state = Loginstates.LOGGED_IN;
                    }
                )
            }
        ).catch(() => this.state = Loginstates.LOGGEDOUT)
    }

    /**
     * //TODO: Implement
     */
    fetchUsers() {
        const token = this.token;
        this.loading = this.states.LOADING;
        fetch(baseUrl + "api/users", {
            headers: {
                Authorization: token
            }
        }).then(/*....*/)
    }
}


/*
decorate(TokenStore,{
    state: observable,
    token: observable,
    logindata:observable

});
 */



export const tokenStore = new TokenStore();