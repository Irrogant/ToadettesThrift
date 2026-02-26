import { useState, useEffect, useMemo } from "react";
import { useAuth } from "./AuthContext.jsx";

// Updated useCart.js

export function useCart() {
    const [cartIDs, setCartIDs] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [couponCode, setCouponCode] = useState(""); // State for coupon code
    const [priceWithDiscount, setPriceWithDiscount] = useState(0); // Price with coupon applied
    const { isLoggedIn, username } = useAuth();

    function clearCart() {
        setCartIDs([]);
        localStorage.removeItem(`cart_${username}`); // Remove cart from localStorage
    }

    useEffect(() => {
        if (!isLoggedIn) {
            setCartIDs([]);
            return;
        }

        const stored = localStorage.getItem(`cart_${username}`);
        setCartIDs(stored ? JSON.parse(stored) : []);
    }, [isLoggedIn, username]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch("/items.json");
            const data = await response.json();
            setAllItems(data.items);
        };

        fetchItems();
    }, []);

    // Load coupon and price from localStorage on mount
    useEffect(() => {
        const storedCoupon = localStorage.getItem(`coupon_${username}`);
        const storedPrice = localStorage.getItem(`priceWithDiscount_${username}`);
        if (storedCoupon && storedPrice) {
            setCouponCode(storedCoupon);
            setPriceWithDiscount(parseFloat(storedPrice));
        }
    }, [username]);

    // Save cart to localStorage
    function saveCart(updated) {
        setCartIDs(updated);
        localStorage.setItem(`cart_${username}`, JSON.stringify(updated));
    }

    function addToCart(item_id) {
        if (!isLoggedIn) return;
        console.log("Adding to cart:", item_id);
        if (!cartIDs.includes(item_id)) {
            saveCart([...cartIDs, item_id]);
        }
    }

    function removeFromCart(item_id) {
        if (!isLoggedIn) return;
        console.log("Removing from cart:", item_id);
        const updatedCart = cartIDs.filter(id => id !== item_id);
        saveCart(updatedCart);
    }

    function inCart(item_id) {
        return cartIDs.includes(item_id);
    }

    // Cart items
    const cartItems = useMemo(() => {
        return allItems.filter(item =>
            cartIDs.includes(item.id)
        );
    }, [cartIDs, allItems]);

    // Calculate total price
    const price = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + Number(item.price),
            0
        );
    }, [cartItems]);

    // Apply coupon logic with added check
    const applyCoupon = (coupon) => {
        if (!coupon || typeof coupon !== 'string') {
            return "Invalid coupon code.";  // Handle empty or non-string coupon
        }

        const match = coupon.match(/^DISCOUNT(\d+)$/);  // Match format: "DISCOUNT20"
        if (match) {
            const percentage = parseInt(match[1], 10);  // Extract percentage from the code
            if (percentage > 0) {
                const discountedPrice = price * (1 + percentage / 100);  // Apply discount (increase price)
                setPriceWithDiscount(discountedPrice); // Apply discount to price
                setCouponCode(coupon); // Save coupon code to state
                // Save coupon and discounted price to localStorage
                localStorage.setItem(`coupon_${username}`, coupon);
                localStorage.setItem(`priceWithDiscount_${username}`, discountedPrice);
                return `Coupon applied! Price increased by ${percentage}%`; // Message with increased price
            } else {
                setPriceWithDiscount(price);  // No discount if percentage is invalid
                return "Invalid coupon code.";
            }
        } else {
            setPriceWithDiscount(price);  // Reset to normal price if coupon is invalid
            return "Invalid coupon code."; // If the coupon format is incorrect
        }
    };

    // Update price with or without coupon
    useEffect(() => {
        // Only reset price if there's no valid coupon applied
        if (!couponCode) {
            setPriceWithDiscount(price);
        }
    }, [price, couponCode]);  // Price or coupon change triggers this effect

    return {
        addToCart,
        removeFromCart,
        inCart,
        cartItems,
        price,
        priceWithDiscount,
        couponCode,
        setCouponCode,
        applyCoupon,
        clearCart, // Add this line
    };
}