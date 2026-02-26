import { useEffect, useState } from "react";
import {
    Box,
    Modal,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getRandomAd } from "./adService";

export default function GlobalAdSpawner() {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [currentAd, setCurrentAd] = useState("");
    const [closePosition, setClosePosition] = useState({ top: 8, right: 8 });
    const [buttonPosition, setButtonPosition] = useState('column'); // Control button position (above or below)

    useEffect(() => {
        const positionInterval = setInterval(() => {
            // Pick a random corner for the close button
            const positions = [
                { top: 8, right: 8 },
                { top: 8, left: 8 },
                { bottom: 8, right: 8 },
                { bottom: 8, left: 8 },
            ];
            setClosePosition(positions[Math.floor(Math.random() * positions.length)]);
        }, 2000); // Update the cross button position every 0.5 seconds

        const buttonPositionInterval = setInterval(() => {
            // Toggle button position every 1 second between "column" and "column-reverse"
            setButtonPosition((prev) => (prev === 'column' ? 'column-reverse' : 'column'));
        }, 2000); // Switch button position every 1 second

        const adInterval = setInterval(() => {
            if (Math.random() < 0.4) {
                setCurrentAd(getRandomAd());
                setOpen(true);
            }
        }, 15000);

        return () => {
            clearInterval(positionInterval);
            clearInterval(buttonPositionInterval);
            clearInterval(adInterval);
        };
    }, []);

    const handleCloseClick = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
        setOpen(false);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => { }}
                disableEscapeKeyDown
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "400px",
                        maxWidth: "90vw",
                        bgcolor: "rgba(255, 190, 252)",
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
                        onClick={handleCloseClick}
                        sx={{
                            position: "absolute",
                            color: "white",
                            backgroundColor: "rgba(255, 190, 252, 0.6)",
                            "&:hover": {
                                backgroundColor: "rgba(255,0,255,0.6)"
                            },
                            ...closePosition, // apply the random position
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

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            >
                <DialogTitle>WAIT!!</DialogTitle>

                <DialogContent>
                    Are you sure you want to close this?
                </DialogContent>

                <DialogActions
                    sx={{
                        flexDirection: buttonPosition, // Dynamically switch button layout
                        gap: 1,
                        pb: 2,
                        px: 3
                    }}
                >
                    <Button
                        onClick={() => setConfirmOpen(false)}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="large"
                        sx={{
                            fontSize: "1.2rem",
                            py: 1.5,
                            fontWeight: "bold",
                            borderRadius: 3
                        }}
                    >
                        No ❤︎
                    </Button>

                    <Button
                        onClick={handleConfirmClose}
                        variant="text"
                        size="small"
                        sx={{
                            fontSize: "0.65rem",
                            opacity: 0.6,
                            textTransform: "none",
                            minWidth: "auto",
                            p: 0.5,
                            "&:hover": {
                                opacity: 1,
                                backgroundColor: "transparent"
                            }
                        }}
                    >
                        i guess
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}