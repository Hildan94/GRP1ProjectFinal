import {useNavigate} from "react-router-dom";
import {React} from "react";
import { Helmet } from 'react-helmet';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

//Logs
Sentry.init({
    dsn: "https://7aa5efdc5b344ed69dc17600b98538e4@o4504162380808192.ingest.sentry.io/4504198675300352",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

function Home() {

    const navigate = useNavigate()

    const toQuizzes = () => {
        navigate('/quizzes')
    }
    return (
        <div>
            <Helmet>
                <title>NEM Læringsplatform</title>
            </Helmet>
            <div>
                <h1> NEM Læringsplatform </h1>
                <h2> Vælg et fag </h2>
            </div>
            <div>
                <button name="Matematik" onClick={toQuizzes}>* Matematik</button>
            </div>
            <div>
                <button name="Dansk" onClick={toQuizzes}>* Dansk</button>
            </div>
            <div>
                <button name="Historie" onClick={toQuizzes}>* Historie</button>
            </div>
            <div>
                <button name="Geografi" onClick={toQuizzes}>* Geografi</button>
            </div>
            <div>
            </div>
        </div>
    );

}

export default Home;
