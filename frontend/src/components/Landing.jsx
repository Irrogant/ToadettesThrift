import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BACKEND_URL } from './variables';
import getCookie from './cookie';



function Landing() {
    const navigate = useNavigate();
    const url = `${BACKEND_URL}/landing`
    const alreadyLanded = getCookie('already_landed');

    useEffect(() => {
        if (!alreadyLanded) {
            window.location.href = url;
        }
        else {
            navigate("/")
        }
    }, []);

    return null;
}


export default Landing;