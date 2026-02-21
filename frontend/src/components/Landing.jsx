import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from './cookie.js'; // assuming you import your cookie functions
import { useTheme } from '@mui/material/styles'; // Import useTheme

function Landing() {
    const navigate = useNavigate();
    const alreadyLanded = getCookie('already_landed');
    const theme = useTheme(); // Get the theme object

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (!alreadyLanded) {
            setShowPopup(true); // Show the pop-up if it's the user's first time
        } else {
            navigate("/"); // Redirect if the user has already accepted the policy
        }
    }, [alreadyLanded, navigate]);

    const handleAccept = () => {
        setCookie('already_landed', 'true', { expires: 365 }); // Set cookie for 365 days
        setShowPopup(false); // Close the pop-up
        navigate('/'); // Redirect after accepting
    };

    return (
        <>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content" style={{ backgroundColor: theme.palette.primary.main }}>
                        <h2>Privacy Policy</h2>
                        <p>Please accept our privacy policy to continue.</p>
                        <button onClick={handleAccept}>Accept</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Landing;