import {useNavigate} from "react-router-dom";
import {React} from "react";
import { Helmet } from 'react-helmet';

function Notfound() {

    const navigate = useNavigate()

    const toFrontpage = () => { // Login page
        navigate('/')
    }

    return (
        <div>
            <Helmet>
                <title>NEM Læringsplatform</title>
            </Helmet>
            <div>
               <h1>Four oh four</h1>
            </div>
        </div>
    );

}

export default Notfound;
