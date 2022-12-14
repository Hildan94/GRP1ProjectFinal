import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
//import Signup from "./pages/signup";
//import Home from "./pages/home";
//import Quizzes from "./pages/quizzes";
//import Quiz from "./pages/quiz";
    //import Quiznew from "./pages/quiznew";
//import ReportsOverview from "./pages/Reports/ReportsOverview";
//import Notfound from "./pages/notFound";

//<---------- Roboto font ---------->
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//import Report from "./pages/Reports/Report";

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    //name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const token = getParameterByName("token");
if (token!=null && token.length>0){
    //Store token and redirect to baseURL
    localStorage.setItem("userToken",token);
    window.location.replace("/");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <App/>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
