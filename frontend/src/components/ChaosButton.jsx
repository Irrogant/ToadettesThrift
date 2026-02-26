import React, { useRef, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, Box, Typography } from "@mui/material";
import { useMusic } from './MusicContext';

function ChaosButton({ children }) {
    const { playTrack } = useMusic();

    const [stars, setStars] = useState([]);
    const [chaosActive, setChaosActive] = useState(false);
    const [showCoupon, setShowCoupon] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponGenerated, setCouponGenerated] = useState(false);
    const [chaosStartTime, setChaosStartTime] = useState(null);

    const maxStars = 300;
    const timerRef = useRef(null);
    const chaosTimeoutRef = useRef(null);

    const getRandomStar = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        return {
            id: Date.now() + Math.random(),
            top: Math.random() * viewportHeight, // Expand to the full height of the viewport
            left: Math.random() * viewportWidth, // Expand to the full width of the viewport
            size: Math.random() * 15 + 10, // Size between 10px and 25px
            shape: Math.random() < 0.5 ? "circle" : "star",
            animationDuration: Math.random() * 10 + 5 + "s", // Animation duration between 5s and 15s
            animationDelay: Math.random() * 5 + "s", // Delay between 0s and 5s
            rotation: Math.random() * 360, // Random rotation for visual effect
        };
    };

    const generateCoupon = () => {
        const discountValues = [30, 40, 50];
        const randomDiscount = discountValues[Math.floor(Math.random() * discountValues.length)];
        return `DISCOUNT${randomDiscount}`;
    };

    const generateCouponWithDelay = () => {
        if (couponGenerated) return; // Don't generate a coupon if one has already been generated

        // Check if chaos mode has been active for at least 4 seconds
        const timeInChaos = Date.now() - chaosStartTime;
        if (timeInChaos >= 3000) {
            setCouponCode(generateCoupon());
            setShowCoupon(true);
            setCouponGenerated(true);
        }
    };

    useEffect(() => {
        if (!timerRef.current) {
            timerRef.current = setInterval(() => {
                if (document.body.classList.contains("chaos-mode")) {
                    setStars((prevStars) => {
                        const newStars = [...prevStars, getRandomStar()];
                        if (newStars.length > maxStars) newStars.shift();
                        return newStars;
                    });
                }
            }, 10);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current); // Clean up the timer
                timerRef.current = null;
            }
        };
    }, []);

    const startChaos = () => {
        document.body.classList.add("chaos-mode");
        setChaosActive(true);
        setCouponGenerated(false); // Reset coupon generation flag when chaos starts
        setChaosStartTime(Date.now()); // Start the chaos timer

        // Set a timeout to check after 4 seconds if the chaos is still active
        chaosTimeoutRef.current = setTimeout(generateCouponWithDelay, 3000);
    };

    const stopChaos = () => {
        document.body.classList.remove("chaos-mode");
        setChaosActive(false);
        setStars([]); // Clear stars when chaos stops
        setCouponGenerated(false); // Reset coupon flag to allow a new coupon next time chaos starts

        if (chaosTimeoutRef.current) {
            clearTimeout(chaosTimeoutRef.current); // Clear the timeout if chaos stops before 4 seconds
        }
    };

    const handleCloseCoupon = () => {
        setShowCoupon(false);
    };

    useEffect(() => {
        if (chaosActive) {
            playTrack("/music/star.mp3");
        }
        if (showCoupon) {
            playTrack("/music/coupon.mp3");
        } else {
            playTrack("/music/balloon_battle.mp3");
        }
    }, [chaosActive, showCoupon]);

    const handleButtonClick = (e) => {
        stopChaos(); // Stop chaos on button click
        if (typeof children.props.onClick === "function") {
            children.props.onClick(e); // Call the original onClick handler of the button
        }
    };

    return (
        <>
            <Box className="chaos-container" onMouseEnter={startChaos} onMouseLeave={stopChaos}>
                {React.cloneElement(children, { onClick: handleButtonClick })}
            </Box>
            {stars.map((star) => (
                <div
                    key={star.id}
                    className={star.shape}
                    style={{
                        position: "fixed", // Change to fixed to make stars relative to the viewport
                        top: `${star.top}px`,
                        left: `${star.left}px`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDuration: star.animationDuration,
                        animationDelay: star.animationDelay,
                        transform: `rotate(${star.rotation}deg)`,
                        zIndex: 9999, // Ensure stars are on top of everything
                        pointerEvents: "none", // Prevent interaction with other elements
                    }}
                ></div>
            ))}
            <Dialog open={showCoupon} onClose={handleCloseCoupon} maxWidth="xs">
                <DialogContent style={{ padding: "0 10px" }}>
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                        <img
                            src="/gifs/toadette_yay.gif"
                            alt="Discount"
                            className="coupon-image"
                            style={{ width: "120px", height: "120px", marginBottom: "10px" }}
                        />
                        <Typography variant="h6" align="center" gutterBottom>
                            WOAH! You found a discount to apply at checkout!
                        </Typography>
                        <Typography variant="h5" color="primary" align="center" sx={{ fontWeight: "bold", marginTop: "5px" }}>
                            {couponCode}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions style={{ padding: "8px 16px" }}>
                    <Button onClick={handleCloseCoupon} color="primary" size="small">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ChaosButton;