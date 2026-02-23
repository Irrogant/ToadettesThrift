import React, { useRef, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, Box, Typography } from "@mui/material";
import { useMusic } from './MusicContext'; // Import the useMusic hook

function ChaosButton({ children }) {
    const { playMusic, stopMusic } = useMusic();
    const audioRef = useRef(new Audio("/music/star.mp3"));
    const couponAudioRef = useRef(new Audio("/music/coupon.mp3"));

    const [stars, setStars] = useState([]);
    const [showCoupon, setShowCoupon] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponGenerated, setCouponGenerated] = useState(false);

    const maxStars = 300;
    const timerRef = useRef(null);

    const getRandomStar = () => ({
        id: Date.now() + Math.random(),
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 15 + 10,
        shape: Math.random() < 0.5 ? "circle" : "star",
        animationDuration: Math.random() * 10 + 5 + "s",
        animationDelay: Math.random() * 5 + "s",
        rotation: Math.random() * 360,
    });

    const generateCoupon = () => {
        const discountValues = [10, 20, 30, 40];
        const randomDiscount = discountValues[Math.floor(Math.random() * discountValues.length)];
        return `DISCOUNT${randomDiscount}`;
    };

    const generateCouponWithDelay = () => {
        if (couponGenerated) return; // Don't generate a coupon if one has already been generated
        const delay = Math.random() * (7000 - 3000) + 3000; // Random delay between 3-7 seconds
        setTimeout(() => {
            setCouponCode(generateCoupon());
            setShowCoupon(true);
            setCouponGenerated(true); // Mark coupon as generated
        }, delay);
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
        audioRef.current.loop = true;
        playMusic(audioRef.current); // Play chaos music and stop the previous one
        generateCouponWithDelay();
    };

    const stopChaos = () => {
        document.body.classList.remove("chaos-mode");
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setStars([]); // Clear stars when chaos stops
        stopMusic(); // Stop music when chaos stops
    };

    const handleCloseCoupon = () => {
        setShowCoupon(false);
        couponAudioRef.current.pause();
        couponAudioRef.current.currentTime = 0;
        stopMusic(); // Stop music when coupon dialog is closed
    };

    useEffect(() => {
        if (showCoupon) {
            couponAudioRef.current.play().catch(() => console.log("Autoplay blocked for coupon sound"));
            couponAudioRef.current.loop = true;
            playMusic(couponAudioRef.current); // Play coupon sound, stop other music
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [showCoupon]);

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
                        top: `${star.top}vh`,
                        left: `${star.left}vw`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDuration: star.animationDuration,
                        animationDelay: star.animationDelay,
                        transform: `rotate(${star.rotation}deg)`,
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