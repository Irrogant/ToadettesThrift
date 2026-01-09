import React, { useState } from "react";
import { BACKEND_URL } from "./variables.js";
import { Container } from "@mui/material";
import useItems from "./useItems";
import Typography from '@mui/material/Typography';
import Items from "./Items.jsx"
import { useCart } from "./useCart.jsx";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Cart() {

    const { items } = useCart()

    console.log(items)

    return (
        <Container maxWidth="false">
            <h2 style={{ textAlign: "center" }}>u sure about this?</h2>
            {items.length === 0 ? (
                <Typography>maybe add something to ur cart lmao</Typography>
            ) : (
                <>
                <Items items={items} />
                <Button component={Link} to="/cart" color="inherit">
                    <Typography> BUY </Typography>
                </Button>
                </>
            )}

        </Container>
    );
}


export default Cart;

    // fetch items from backend
    // display items
