import { BACKEND_URL } from "./variables.js";
import React, { useState, useEffect, useCallback } from "react";

function useMessages({ END_URL }) {
    const [messages, setMessages] = useState([]);

    const refetchMessages = useCallback(() => {
        fetch(`${BACKEND_URL}/${END_URL}`, { credentials: "include" })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch messages");
                return res.json();
            })
            .then((data) => setMessages(data.messages ?? []))
            .catch(console.error);
    }, [END_URL]);

    useEffect(() => {
        refetchMessages();
        console.log("REFEEETCHHHHINGGGGGGGGGGGGGGGGGG", messages)
    }, [refetchMessages]);

    useEffect(() => {
        console.log("REFETCH messages", messages)
    }, [messages]);


    return { messages, refetchMessages };
}

export default useMessages;