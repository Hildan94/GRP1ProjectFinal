import './App.css';
import Frontpage from "./pages/frontpage";
import {observer} from "mobx-react-lite";
import {Loginstates, tokenStore} from "./stores/TokenStore";
import Home from "./pages/home";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Signup from "./pages/signup";
import Quizzes from "./pages/quizzes";
import Quiz from "./pages/quiz";
import Quiznew from "./pages/quiznew";
import ReportsOverview from "./pages/Reports/ReportsOverview";
import Report from "./pages/Reports/Report";
import Notfound from "./pages/notFound";
import React from "react";

function App() {
    const loggedIn = tokenStore.state===Loginstates.LOGGED_IN
    return (
        <div className="App">
            {loggedIn ? <>
                <Router>
                <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/quizzes" element={<Quizzes/>}/>
                <Route exact path="/quiz/:quizid/:questionid" element={<Quiz/>}/>
                <Route path="/quiznew" element={<Quiznew/>}/>
                <Route path="/reportsoverview" element={<ReportsOverview/>}/>
                <Route path="/reportsoverview/report" element={<Report/>}/>
                <Route path="*" element={<Notfound/>}/>
                </Routes>
                </Router>
            </> : <Frontpage/>}
        </div>
    );
}

export default observer(App);
