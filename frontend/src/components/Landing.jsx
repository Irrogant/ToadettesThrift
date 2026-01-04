import { useEffect } from "react";
import { BACKEND_URL } from "./variables";
import getCookie from "./cookie";
import { useNavigate } from 'react-router-dom';



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