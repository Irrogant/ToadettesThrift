import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
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

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',  // Aligns content to the top
                minHeight: '100vh',
                textAlign: 'center',
                pt: 4,  // Adds padding-top to move content a bit down (adjust this value)
            }}
        >   {error && <p style={{ color: "red" }}>{error}</p>}

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

                    {!isOwner && (
                        <ChaosButton>
                            <Button onClick={() => { addToCart(item.id); navigate("/cart"); }}>
                                BUY
                            </Button>
                        </ChaosButton>
                    )}
                    {isOwner && <Button color="error" onClick={handleDelete}>DELETE</Button>}
                </>
            )}
        </Container>
    );
}

export default ItemDetail;