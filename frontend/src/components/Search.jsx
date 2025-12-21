import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "./variables.js";
import { Container } from "@mui/material";
import Items from "./Items.jsx"
import { useSearchParams } from "react-router-dom";

function Search() {  

    const [items, setItems] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const searchItems = async (query) => {
        if (!query) return; /* no query, no search */

        const url = `${BACKEND_URL}/searchitems/?q=${encodeURIComponent(query)}`;

        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            });

        const data = await response.json();

        /* return array of the titles */
        setItems(data.items);
    }

    useEffect(() => {
        searchItems(query);
    }, [query]);

    return (
    <Container maxWidth="false">
        <h2 style={{ textAlign: "center" }}>reshults</h2>
        < Items items={items} />
    </Container>
    );
}


export default Search;