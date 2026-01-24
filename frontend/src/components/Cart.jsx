import React, { useState } from "react";
import { BACKEND_URL } from "./variables.js";
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import Items from "./Items.jsx"
import { useCart } from "./useCart.jsx";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { useCartContext } from "./CartContext.jsx";

function Cart() {
    const { isLoggedIn } = useAuth();
    const { items } = useCartContext();


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

            {items.length === 0 ? (
                <Typography>maybe add something to ur cart lmao</Typography>
            ) : (
                <>
                    <Items items={items} />
                    <Button component={Link} to="/cart" color="inherit">
                        <Typography>PAY</Typography>
                    </Button>
                </>
            )}
        </Container>
    );
}

export default Cart;
