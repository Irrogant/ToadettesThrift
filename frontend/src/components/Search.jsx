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

        // Set the search result to always be the fixed message
        setItems([{ title: "I don't get paid enough for this" }]);
    };

    useEffect(() => {
        searchItems(query);
    }, [query]);

    return (
        <Container maxWidth="false">
            <h2 style={{ textAlign: "center" }}>Results</h2>
            <Items items={items} />
        </Container>
    );
}

export default Search;