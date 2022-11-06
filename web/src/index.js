import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from "./pages/signup";
import Home from "./pages/home";
import Quizzes from "./pages/quizzes";
import Quiz from "./pages/quiz";
import Quiznew from "./pages/quiznew";
import ReportsOverview from "./pages/Reports/ReportsOverview";

//<---------- Roboto font ---------->
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Report from "./pages/Reports/Report";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/quizzes" element={<Quizzes/>}/>
            <Route path="/quiz" element={<Quiz/>}/>
            <Route path="/quiznew" element={<Quiznew/>}/>
            <Route path="/reportsoverview" element={<ReportsOverview/>}/>
            <Route path="/reportsoverview/report" element={<Report/>}/>
        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
