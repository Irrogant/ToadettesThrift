import { useState, useEffect, useMemo } from 'react';

import useCartItems from './useCartItems.js';
import useCartMessages from './useCartMessages.js';
import useSubmit from './useSubmit.js';
import { useAuth } from "./AuthContext.jsx";

export function useCart() {
    const [price, setPrice] = useState(0)
    const [error, setError] = useState(null);
    const { cartItems, refetch } = useCartItems({ END_URL: "cart/", });
    const { messages, refetchMessages } = useCartMessages({ END_URL: "cart/" });
    const { isLoggedIn } = useAuth()

    useEffect(() => {
        const cartPrice = cartItems.reduce(
            (total, item) => total + Number(item.price),
            0
        );
        setPrice(cartPrice);
    }, [cartItems]);

    // gets corresponding real item ids
    const itemIDs = useMemo(() => {
        if (!cartItems) return [];
        const awooga = cartItems.map(item => item.id);
        return awooga;
    }, [cartItems]);

    const submit = useSubmit({
        END_URL: "cart/",
        onSuccess: () => { refetch(), refetchMessages() },
        onError: (data) => setError(data?.error || "Failed to modify cart"),
        method: "POST"
    });

    async function modifyCart(item_id, action) {
        if (!isLoggedIn) {
            return;
        }
        await submit({ item_id, action });
    }

    async function addToCart(item_id) {
        await modifyCart(item_id, "add")
    }

    async function removeFromCart(item_id) {
        await modifyCart(item_id, "remove")
    }

    function inCart(item_id) {
        if (!isLoggedIn) {
            return false;
        }
        return itemIDs.includes(item_id);
    }

    return { addToCart, removeFromCart, inCart, modifyCart, cartItems, price, messages, refetch }
}



