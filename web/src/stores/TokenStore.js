import {makeAutoObservable} from "mobx";

//TODO: Får et token hver gang doLogin bliver brugt (ikke så smart at bruge til knap)




const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:8080/":""; //Check if dev

export const Loginstates = {LOGGING_IN:"Loading", LOGGEDOUT:"Logout", LOGGED_IN:"LoggedIn"};
class TokenStore {
    state = Loginstates.LOGGEDOUT;
    token = null;
    logindata = {username: "", password: ""};
    states;

    constructor() {
        this.token = localStorage.getItem("userToken")
        makeAutoObservable(this)
        //Validate if token is still good and keep/discard token and set state
    }


    doLogin = (username, password)=> {
        this.state =  Loginstates.LOGGING_IN;
        this.logindata.username = username;
        this.logindata.password = password;
        fetch(baseUrl + 'api/login', {
            method: 'POST',
            body: JSON.stringify(this.logindata),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            (response) => {
                if(response.ok){
                console.log("response", response.status)
                response.text().then(
                    (token) => {
                        console.log("Got Token: " + token)
                        this.token = token;
                        localStorage.setItem("userToken", token);
                        this.state = Loginstates.LOGGED_IN;
                        console.log("made it to here", localStorage.getItem(token));
                    }
                )
            }
                else{this.state = Loginstates.LOGGEDOUT}
            }
        ).catch(() => this.state = Loginstates.LOGGEDOUT)
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


/*
decorate(TokenStore,{
    state: observable,
    token: observable,
    logindata:observable

});
 */



export const tokenStore = new TokenStore();