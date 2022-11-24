import {makeAutoObservable} from "mobx";

//TODO: Får et token hver gang doLogin bliver brugt (ikke så smart at bruge til knap)




const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:8080/":""; //Check if dev

const Loginstates = {LOGGING_IN:"Loading", LOGGEDOUT:"Logout", LOGGED_IN:"LoggedIn"};
class TokenStore {
    state = Loginstates.LOGGEDOUT;
    token = null;
    logindata = {username: "Troels", password: "Superkodeord"};
    states;

    constructor() {
        this.token = localStorage.getItem("userToken")
        makeAutoObservable(this)
        //Validate if token is still good and keep/discard token and set state
    }


    doLogin = ()=> {
        this.state =  Loginstates.LOGGING_IN;
        fetch(baseUrl + 'api/login', {
            method: 'POST',
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
                        localStorage.setItem("userToken", token);
                        this.state = Loginstates.LOGGED_IN;
                    }
                )
            }
        ).catch(() => this.state = Loginstates.LOGGEDOUT)
    }

    campusLogin = ()=>{
        fetch(baseUrl + 'campusnet/login', {
            method: 'GET'
        }).then(
            (response) => {
                response.text().then(
                    (token) => {
                        console.log("Got Token: " + token)
                        this.token = token;
                        localStorage.setItem("userToken", token);
                        this.state = Loginstates.LOGGED_IN;
                    }
                )
            }
        )


    }



/**
     * Check hvad der skal være i .then
     */
    checkToken = ()=> {
        fetch(baseUrl + 'api/login/tokentest', {
            method: 'POST',
            headers: {
                Authorization : this.token
            }

        }).then(r => {

        })
    }

    /**
     * //TODO: Implement if needed
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



export const tokenStore = new TokenStore();