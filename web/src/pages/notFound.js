import {useNavigate} from "react-router-dom";
import {React} from "react";
import { Helmet } from 'react-helmet';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

function Notfound() {

    const navigate = useNavigate()

    const toFrontpage = () => { // Login page
        navigate('/')
    }

    const toPrevpage = () => {
        navigate(-1)
    }

    return (
        /* Material UI inspiration from: https://frontendshape.com/post/react-mui-5-404-page-example */

        /*
        <div>
            <Helmet>
                <title>NEM Læringsplatform</title>
            </Helmet>
            <div>
               <h1>Four oh four</h1>
            </div>
        </div>
        */
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: purple[500],
        }}
    >
        <Typography variant="h1" style={{ color: 'white' }}>
            Hov, noget gik galt!
        </Typography>
        <Typography variant="h4" style={{ color: 'white' }}>
            Siden du leder efter blev ikke fundet :(
        </Typography>
        <Typography variant="h6" style={{ color: 'white' }}>

        </Typography>
        <Button onClick={toPrevpage} variant="contained">Gå tilbage</Button>
    </Box>
    );

}

export default Notfound;
