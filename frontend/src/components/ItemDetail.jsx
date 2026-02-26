import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useAuth } from "./AuthContext";
import { useCart } from "./useCart.jsx";
import ChaosButton from "./ChaosButton";
import coin from "../assets/icons/coin.png";
import AdRow from "./AdRow.jsx"; // <-- import reusable component

function ItemDetail() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("id");
    const [item, setItem] = useState(null);
    const [error, setError] = useState("");
    const { username } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch("/items.json");
                if (!response.ok) throw new Error("Failed to fetch items");
                const data = await response.json();
                const foundItem = data.items.find(i => String(i.id) === String(query));
                if (!foundItem) throw new Error("Item not found");
                setItem(foundItem);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchItem();
    }, [query]);

    const playError = () => {
        const audio = new Audio("/sounds/error.mp3");
        audio.play();
    };

    return (
        <>
            <Container
                sx={{
                    backgroundColor: "rgba(186, 81, 160, 0.8)",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    minHeight: '500px',
                    textAlign: 'center',
                    pt: 7,
                }}
            >
                {error && <p style={{ color: "red" }}>{error}</p>}

                {item && (
                    <>
                        <h2>{item.title}</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Stack spacing={2}>
                                    <Typography>{item.description}</Typography>
                                    <Typography sx={{ display: "inline-flex", alignItems: "center", gap: "0.25em" }}>
                                        {item.price}
                                        <img src={coin} alt="Coin" style={{ width: "1em", height: "1em" }} />
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={8}>
                                <Box
                                    sx={{
                                        width: 250,
                                        height: 250,
                                        borderRadius: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                        position: "relative",
                                        border: "5px solid pink",
                                    }}
                                >
                                    {item.image ? (
                                        <img src={`/images/${item.image}`} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                        <Typography>No image</Typography>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
                            <Button onClick={playError} sx={{ backgroundColor: theme.palette.primary.main, color: 'white', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
                                BACK
                            </Button>

                            <ChaosButton>
                                <Button
                                    onClick={() => { addToCart(item.id); navigate("/cart"); }}
                                    sx={{ backgroundColor: theme.palette.secondary.main, color: 'white', boxShadow: 3, '&:hover': { boxShadow: 6 } }}
                                >
                                    BUY
                                </Button>
                            </ChaosButton>
                        </Box>
                    </>
                )}
            </Container>

            {/* Reusable Ad Row */}
            <AdRow count={4} />
        </>
    );
}

export default ItemDetail;