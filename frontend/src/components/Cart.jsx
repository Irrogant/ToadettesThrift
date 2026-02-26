import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, TextField, useTheme, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
    } = useCartContext();

    const theme = useTheme();
    const [messages, setMessages] = useState("");
    const [viewPaymentForm, setViewPaymentForm] = useState(false);
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [address, setAddress] = useState("");  // State to handle address
    const [error, setError] = useState("");
    const [paymentSuccessful, setPaymentSuccessful] = useState(false); // Track payment status
    const [orderCompleted, setOrderCompleted] = useState(false); // Track if order is completed
    const [viewAddressForm, setViewAddressForm] = useState(false);  // State to manage address popup visibility

    useEffect(() => {
        setMessages("");
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
        const message = applyCoupon(couponCode);
        setMessages(message);
    };

    const handlePayClick = () => {
        setViewPaymentForm(true); // Show payment form in the dialog
    };

    const handleCardInputChange = (e) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 16);
        if (value.length > 4) value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        setCreditCardNumber(value);
    };

    const handlePaymentSubmit = () => {
        if (!creditCardNumber || !expirationDate || !cvv) {
            setError("Please fill out all credit card fields.");
            return;
        }

        // Proceed with payment logic
        setPaymentSuccessful(true);  // Set payment as successful
        setCreditCardNumber("");
        setExpirationDate("");
        setCvv("");
        setViewPaymentForm(false); // Close the payment form dialog
        setViewAddressForm(true); // Show address form dialog
    };

    const handleAddressSubmit = () => {
        if (!address) {
            setError("Please enter a valid address.");
            return;
        }

        // Handle address submission (e.g., send address to backend, save to order, etc.)
        setOrderCompleted(true);
        setAddress(""); // Clear address after submission
        setViewAddressForm(false); // Close address form after submission

        // Clear the cart after order completion
        clearCart(); // Clear the cart after the order is completed
    };

    if (orderCompleted) {
        return (
            <Container maxWidth="sm" sx={{
                backgroundColor: "rgba(186, 81, 160, 0.8)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "30px",
                paddingBottom: "30px",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}>
                <Typography variant="h4">Thank You for Your Order!</Typography>
                <Typography>your package will be sent to Date City Hall in Iburi Subprefecture, Hokkaido, Japan</Typography>
            </Container>
        );
    }


    return (
        <Container maxWidth="sm" sx={{
            backgroundColor: "rgba(186, 81, 160, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "30px",
            paddingBottom: "30px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
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
                        {priceWithDiscount}
                        <img
                            src={coin}
                            alt="Coin"
                            style={{
                                width: "1em",
                                height: "1em",
                            }}
                        />
                    </Typography>

                    <TextField
                        label="Coupon Code"
                        variant="outlined"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        sx={{ width: '200px', marginBottom: '16px' }}
                    />

                    <Button
                        onClick={handleCouponApply}
                        variant="contained"
                        color="primary"
                        sx={{ width: '100%' }}
                    >
                        Apply Coupon
                    </Button>

                    {messages && <Typography sx={{ color: priceWithDiscount > price ? 'green' : 'red' }}>{messages}</Typography>}

                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            width: '100%',
                            padding: '12px'
                        }}
                        onClick={handlePayClick}
                        color="inherit"
                    >
                        <Typography>PAY</Typography>
                    </Button>
                </Box>
            )}

            {/* Payment Form Dialog with Transparent Pink Background and Larger Size */}
            <Dialog
                open={viewPaymentForm}
                onClose={() => setViewPaymentForm(false)}
                sx={{
                    '& .MuiDialog-paper': {
                        maxWidth: '600px',   // Set max width of dialog to be larger
                        width: '90%',        // Set the dialog width to 90% of screen width
                    }
                }}
            >
                <DialogTitle sx={{ color: 'pink' }}>Enter Payment Details</DialogTitle>
                <DialogContent sx={{ backgroundColor: 'rgba(255, 105, 180, 0.5)' }}>
                    {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
                    <TextField
                        label="Credit Card Number"
                        value={creditCardNumber}
                        onChange={handleCardInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Expiration Date (MM/YY)"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewPaymentForm(false)} color="secondary" sx={{ color: 'pink' }}>Cancel</Button>
                    <Button onClick={handlePaymentSubmit} color="primary" sx={{ color: 'pink' }}>Submit Payment</Button>
                </DialogActions>
            </Dialog>

            {/* Address Form Dialog */}
            <Dialog
                open={viewAddressForm}
                onClose={() => setViewAddressForm(false)}
                sx={{
                    '& .MuiDialog-paper': {
                        maxWidth: '600px',   // Set max width of dialog to be larger
                        width: '90%',        // Set the dialog width to 90% of screen width
                    }
                }}
            >
                <DialogTitle sx={{ color: 'pink' }}>Enter Shipping Address</DialogTitle>
                <DialogContent sx={{ backgroundColor: 'rgba(255, 105, 180, 0.5)' }}>
                    {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
                    <TextField
                        label="Shipping Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewAddressForm(false)} color="secondary" sx={{ color: 'pink' }}>Cancel</Button>
                    <Button onClick={handleAddressSubmit} color="primary" sx={{ color: 'pink' }}>Submit Address</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Cart;