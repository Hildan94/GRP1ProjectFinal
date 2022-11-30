import './App.css';
import Frontpage from "./pages/frontpage";
import {observer} from "mobx-react-lite";
import {Loginstates, tokenStore} from "./stores/TokenStore";
import Home from "./pages/home";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Signup from "./pages/createUser/signup";
import Quizzes from "./pages/quizzes";
import Quiz from "./pages/quiz";
//import Quiznew from "./pages/quiznew";
import Quiznew from "./pages/Quiz/quiznew";
import ReportsOverview from "./pages/Reports/ReportsOverview";
import Report from "./pages/Reports/Report";
import Notfound from "./pages/notFound";
import React from "react";
//import App from './App';
//import reportWebVitals from './reportWebVitals';
//import Questions from "./pages/Quiz/questions"
import CampusLogin from "./pages/CampusLogin";
import Questions from "./pages/Quiz/questions"
//import Quiznew from "./pages/quiznew"



function App() {
    const loggedIn = tokenStore.state===Loginstates.LOGGED_IN
    return (
        <div className="App">
            {loggedIn ? <>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/quizzes" element={<Quizzes/>}/>
                    <Route exact path="/quiz/:quizid/:questionid" element={<Quiz/>}/>
                    <Route path="/quiznew" element={<Quiznew/>}/>
                    <Route path="/campuslogin" element={<CampusLogin/>}/>
                    <Route path="/questions/:quizid" element={<Questions/>}/>
                    <Route path="/reportsoverview" element={<ReportsOverview/>}/>
                    <Route path="/reportsoverview/report" element={<Report/>}/>
                    <Route path="*" element={<Notfound/>}/>
                </Routes>
            </> :  <Routes>
                    <Route path="/" element={<Frontpage/>}></Route>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/campuslogin" element={<CampusLogin/>}/>
                    <Route exact path="/quiz/:quizid/:questionid" element={<Quiz/>}/>
                    <Route path="/quizzes" element={<Quizzes/>}/>
                    <Route path="*" element={<Notfound/>}/>
            </Routes>

                }
        </div>
    );
}

export default observer(App);
