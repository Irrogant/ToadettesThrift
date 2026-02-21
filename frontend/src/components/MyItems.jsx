import { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Items from "./Items.jsx";

function MyItems() {
    const [items, setItems] = useState([]);

    // Load items from localStorage or JSON
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("items") || "[]");
        setItems(stored);
    }, []);

    // Filter items for purchased items only
    const displayItems = items.filter((item) => item.purchased_items?.length > 0);

    return (
        <Container>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                <Typography variant="h6" align="center">Purchased Items</Typography>
                {displayItems.length === 0 ? (
                    <Typography>No purchased items available</Typography>
                ) : (
                    <Items items={displayItems} />
                )}
            </Box>
        </Container>
    );
}

export default MyItems;