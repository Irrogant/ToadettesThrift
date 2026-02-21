import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Container } from '@mui/material';
import Items from './Items.jsx';

function Search() {

    const [items, setItems] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const searchItems = async (query) => {
        if (!query) {
            setItems([]);
            return;
        }

        try {
            const response = await fetch("/items.json");
            if (!response.ok) throw new Error("Failed to fetch items");

            const data = await response.json();

            const filtered = data.items.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            );

            setItems(filtered);
        } catch (error) {
            console.error(error);
        }
    };

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