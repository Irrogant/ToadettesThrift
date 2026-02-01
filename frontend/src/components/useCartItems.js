import { BACKEND_URL } from "./variables.js";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext.jsx";

// beautiful code duplication to prevent cart items from being fetched for non-logged in user
function useCartItems({ END_URL }) {
    const [cartItems, setCartItems] = useState([]);
    const { isLoggedIn } = useAuth()

    const refetch = useCallback(() => {
        if (!isLoggedIn) {
            setCartItems([])
            return;
        }

        fetch(`${BACKEND_URL}/${END_URL}`, { credentials: "include" })
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch items: ${res.status}`);
                return res.json();
            })
            .then((data) => setCartItems(data.items ?? []))
            .catch(console.error);
    }, [END_URL, isLoggedIn]);

    useEffect(() => {
        refetch();
    }, [refetch]);


    return { cartItems, refetch };
}

export default useCartItems;