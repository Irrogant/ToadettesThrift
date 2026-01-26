import React, { useState } from "react";
import { BACKEND_URL } from "./variables.js";
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import Items from "./Items.jsx"
import { useCart } from "./useCart.jsx";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { useCartContext } from "./CartContext.jsx";
import useSubmit from "./useSubmit";

// TODO: fix maxwidth false
function Cart() {
    const { isLoggedIn } = useAuth();
    const { items, refetch } = useCartContext();
    const [error, setError] = useState("");


    const submit = useSubmit({
        END_URL: "checkout/",
        onSuccess: () => {
            alert("yay :^3")
            refetch()
        },
        onError: (data) => setError(data.error || "Error at checkout OOF money gonegone")

    });

    console.log("ITEMSSS IN CARTTTT RNNNNN",)

    if (!isLoggedIn) {
        return (
            <Container>
                <Typography>Please log in to view your cart.</Typography>
            </Container>
        );
    }

    console.log("ITEMSUSUUSUSUSUS", items)
    return (
        <Container maxWidth="false">
            <h2 style={{ textAlign: "center" }}>u sure about this?</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {items.length === 0 ? (
                <Typography>maybe add something to ur cart lmao</Typography>
            ) : (
                <Box component="form" onSubmit={(e) => submit(null, e)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Items items={items} />
                    <Button type="submit" color="inherit">
                        <Typography>PAY</Typography>
                    </Button>
                </Box>
            )}
        </Container>
    );
}

export default Cart;
