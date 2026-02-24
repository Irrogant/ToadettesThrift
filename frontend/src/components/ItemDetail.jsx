import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useAuth } from "./AuthContext";
import { useCart } from "./useCart.jsx";
import ChaosButton from "./ChaosButton";
import coin from "../assets/icons/coin.png";

function ItemDetail() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("id");
    const [item, setItem] = useState(null);
    const [error, setError] = useState("");
    const { username } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const theme = useTheme();

    // Load items from items.json
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

    const isOwner = item && username === item.owner;

    const handleDelete = () => {
        // Remove item from localStorage items.json simulation
        let items = JSON.parse(localStorage.getItem("items") || "[]");
        items = items.filter(i => String(i.id) !== String(query));
        localStorage.setItem("items", JSON.stringify(items));
        navigate("/"); // redirect to home or items list
    };

    const handleAddToCart = (itemId) => {
        addToCart(itemId);  // Some function that adds the item to the cart
        navigate("/cart");  // Navigate to the cart page
    };

    // Array of ad images
    const adGifs = [
        "/ads/food.gif",
        "/ads/car.gif",
        "/ads/wae.gif",
        "/ads/singles.gif",
        "/ads/aaa.gif",
        "/ads/ram.gif",
        "/ads/skins.gif",
        "/ads/vbuck.gif",
        "/ads/gam.gif"
    ];

    // Randomize ads
    const [ads, setAds] = useState(() => Array(4).fill("").map(() => adGifs[Math.floor(Math.random() * adGifs.length)]));
    const playError = () => {
        const audio = new Audio("/sounds/error.mp3");
        audio.play();
    }

    return (
        <>
            <Container
                sx={{
                    backgroundColor: "rgba(186, 81, 160, 0.8)",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',  // Aligns content to the top
                    minHeight: '500px',
                    textAlign: 'center',
                    pt: 7,  // Adds padding-top to move content a bit down (adjust this value)
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
                                        border: "5px solid pink",  // Solid pink border
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
                            {/* Back Button */}
                            <Button onClick={playError}
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: 'white',
                                    boxShadow: 3,
                                    '&:hover': {
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                BACK
                            </Button>

                            {/* Buy Button */}
                            {!isOwner && (
                                <ChaosButton>
                                    <Button
                                        onClick={() => { addToCart(item.id); navigate("/cart"); }}
                                        sx={{
                                            backgroundColor: theme.palette.secondary.main,
                                            color: 'white',
                                            boxShadow: 3,
                                            '&:hover': {
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        BUY
                                    </Button>
                                </ChaosButton>
                            )}

                            {/* Delete Button (for item owners) */}
                            {isOwner && <Button color="error" onClick={handleDelete}>DELETE</Button>}
                        </Box>
                    </>
                )}
            </Container>

            {/* Ad Row at the Bottom */}
            <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", marginTop: "20px", padding: "10px 0" }}>
                {ads.map((ad, index) => (
                    <Box key={index} sx={{ width: "220px", height: "220px", overflow: "hidden", borderRadius: "8px", boxShadow: "0 4px 15px rgba(255, 0, 127, 0.5)", border: "2px solid #ff007f" }}>
                        <img
                            src={ad}
                            alt={`Ad ${index + 1}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                        />
                    </Box>
                ))}
            </Box>
        </>
    );
}

export default ItemDetail;