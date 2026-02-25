import { useEffect, useState, useRef } from "react";
import { Box, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getRandomAd } from "./adService"; // import from new file

export default function GlobalAdSpawner() {
    const [open, setOpen] = useState(false);
    const [currentAd, setCurrentAd] = useState("");
    const timeoutRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() < 0.4) {
                setCurrentAd(getRandomAd());
                setOpen(true);

                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => setOpen(false), 5000);
            }
        }, 15000);

        return () => {
            clearInterval(interval);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleClose = () => {
        setOpen(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "400px",
                    maxWidth: "90vw",
                    height: "auto",
                    bgcolor: "black",
                    border: "4px solid hotpink",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        "&:hover": { backgroundColor: "rgba(255,0,255,0.6)" }
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <img
                    src={currentAd}
                    alt="Random Ad"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "60vh",
                        objectFit: "contain",
                        borderRadius: "6px"
                    }}
                />
            </Box>
        </Modal>
    );
}