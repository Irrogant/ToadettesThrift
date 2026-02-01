import { BACKEND_URL } from "./variables.js";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext.jsx";

// beautiful code duplication to prevent cart items from being fetched for non-logged in user
function useCartMessages({ END_URL }) {
    const [messages, setCartMessages] = useState([]);
    const { isLoggedIn } = useAuth()

    const refetchMessages = useCallback(() => {
        if (!isLoggedIn) {
            setCartMessages([])
            return;
        }
        fetch(`${BACKEND_URL}/${END_URL}`, { credentials: "include" })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch messages");
                return res.json();
            })
            .then((data) => setCartMessages(data.messages ?? []))
            .catch(console.error);
    }, [END_URL, isLoggedIn]);

    useEffect(() => {
        refetchMessages();
    }, [refetchMessages]);


    return { messages, refetchMessages };
}

export default useCartMessages;