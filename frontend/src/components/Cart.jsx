import { useEffect, useState } from 'react';

import { Box, Button, Container, Typography } from '@mui/material';

import { useAuth } from './AuthContext.jsx';
import { useCartContext } from './CartContext.jsx';
import useSubmit from './useSubmit';
import FolderList from './CartList.jsx';

import coin from '../assets/icons/coin.png';

function Cart() {
    const { isLoggedIn } = useAuth();
    const { cartItems, price, refetch } = useCartContext();
    const [error, setError] = useState("");
    const [messages, setMessages] = useState("");
    const [updateMessage, setUpdateMessage] = useState("");

    const submit = useSubmit({
        END_URL: "checkout/",
        onSuccess: (data) => {
            refetch()
            setMessages(data.messages)
            setUpdateMessage(data.updateMessage)
        },
        onError: (data) => setError(data.error || "Error at checkout OOF money gonegone"),
        method: "POST"
    });

    const syncSubmit = useSubmit({
        END_URL: "cart/",
        onSuccess: (data) => {
            refetch()
            setMessages(data.messages)
        },
        onError: (data) => setError(data.error || "Error at cart sync"),
        method: "POST"
    });

    useEffect(() => {
        syncSubmit({ action: "sync" })
    }, []
    )

    useEffect(() => {
    }, [messages]
    )

    if (!isLoggedIn) {
        return (
            <Container>
                <Typography>Please log in to view your cart.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="false" sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <h2 style={{ textAlign: "center" }}>YER CART</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {cartItems.length === 0 ? (

                (updateMessage) ?
                    (<Typography>{updateMessage}</Typography>) :
                    (<Typography>maybe add something to ur cart lmao</Typography>)

            ) : (
                <Box component="form" onSubmit={(e) => submit(null, e)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <FolderList items={cartItems} messages={messages} />
                    <Typography
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25em",
                        }}
                    >
                        {price}
                        <img
                            src={coin}
                            alt="Coin"
                            style={{
                                width: "1em",
                                height: "1em",
                            }}
                        />
                    </Typography>
                    <Button type="submit" color="inherit">
                        <Typography>PAY</Typography>
                    </Button>
                </Box>
            )}
        </Container>
    );
}

export default Cart;
