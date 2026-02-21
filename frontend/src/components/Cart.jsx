// Updated Cart Component
import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, TextField } from '@mui/material';
import { useAuth } from './AuthContext.jsx';
import { useCartContext } from './CartContext.jsx';
import FolderList from './CartList.jsx';
import coin from '../assets/icons/coin.png';

function Cart() {
    const { isLoggedIn } = useAuth();
    const {
        cartItems,
        price,
        removeFromCart,
        priceWithDiscount,
        couponCode,
        setCouponCode,
        applyCoupon
    } = useCartContext();  // Extract couponCode, setCouponCode, and applyCoupon from context

    const [messages, setMessages] = useState(""); // Handle message for coupon status

    useEffect(() => {
        setMessages(""); // Reset messages on every render
    }, [cartItems]);

    if (!isLoggedIn) {
        return (
            <Container>
                <Typography>Please log in to view your cart.</Typography>
            </Container>
        );
    }

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    };

    const handleCouponApply = () => {
        const message = applyCoupon(couponCode); // Apply coupon logic
        setMessages(message);
    };

    console.log(priceWithDiscount)
    return (
        <Container maxWidth="false" sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <h2 style={{ textAlign: "center" }}>YER CART</h2>

            {cartItems.length === 0 ? (
                <Typography>maybe add something to ur cart lmao</Typography>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <FolderList items={cartItems} removeItem={handleRemoveItem} messages={messages} />
                    <Typography sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25em",
                    }}>
                        {priceWithDiscount} {/* Show price after discount */}
                        <img
                            src={coin}
                            alt="Coin"
                            style={{
                                width: "1em",
                                height: "1em",
                            }}
                        />
                    </Typography>

                    {/* Coupon Code Field */}
                    <TextField
                        label="Coupon Code"
                        variant="outlined"
                        value={couponCode}  // Access couponCode from context
                        onChange={(e) => setCouponCode(e.target.value)}  // Update couponCode via context
                        sx={{ width: '200px', marginBottom: '16px' }}
                    />
                    <Button onClick={handleCouponApply} variant="contained" color="primary">
                        Apply Coupon
                    </Button>
                    {messages && <Typography sx={{ color: priceWithDiscount > price ? 'green' : 'red' }}>{messages}</Typography>}

                    <Button onClick={() => alert('oops looks like the item is sold out <3 better luck next time xoxo')} color="inherit">
                        <Typography>PAY</Typography>
                    </Button>
                </Box>
            )}
        </Container>
    );
}

export default Cart;