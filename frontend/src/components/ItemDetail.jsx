import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "./variables.js";
import { Container, Grid, Stack, Button, Box, TextField } from '@mui/material';
import { useAuth } from "./AuthContext";
import useSubmit from "./useSubmit.js"
import { useCart } from "./useCart.jsx"

/*TODO: edit product */

function ItemDetail() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("id");
    const [item, setItem] = useState(null);
    const [error, setError] = useState("");
    const [owner, setOwner] = useState("");
    const { username, email } = useAuth();
    const [view, setView] = useState("info");
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const { addToCart } = useCart();

    const url = `${BACKEND_URL}/itemdetail/?id=${encodeURIComponent(query)}`

    const submit = useSubmit({
        END_URL: `itemdetail/?id=${encodeURIComponent(query)}`,
        JSON_DATA: { title, description, price },
        onSuccess: () => {
            setView("info");
        },
        onError: (data) => setError(data.error || "Edit failed")
    });


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError("");

    //     const response = await fetch(url, {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "X-CSRFToken": getCookie("csrftoken"),
    //     },
    //     body: JSON.stringify({ title, description, price }),
    //     });

    //     const data = await response.json();
    //     if (response.ok) {
    //     setView("info");
    //     } else {
    //     setError(data.error || "Edit failed");
    //     }
    // };    

    useEffect(() => {

        const fetchItem = async () => {
            try {
                const response = await fetch(url,
                    { method: "GET", credentials: "include", });

                if (!response.ok) { throw new Error("Failed to fetch item"); }

                const data = await response.json();
                const item = data.item
                setItem(data.item);
                setOwner(item.owner);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchItem();
    }, [query]);

    useEffect(() => {
        if (item) {
            setId(item.id)
            setTitle(item.title);
            setDescription(item.description);
            setPrice(item.price);
        }
    }, [item]);

    const isOwner = (username === owner) /* if the user viewing is the one who owns the item */

    return (
        <Container maxWidth:sm>
            {view === "info" &&
                <Container maxWidth:sm>
                    <h2>{title}</h2>
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <Stack spacing={2}>
                                <div>{description}</div>
                                <div>{price}</div>
                            </Stack>
                        </Grid>
                        <Grid size={8}>
                            <div sx={{ height: '100%', boxSizing: 'border-box' }}>PICTURE</div>
                        </Grid>
                    </Grid>
                    {!isOwner &&
                        <Button onClick={() => addToCart(id)}>  BUY </Button>}
                    {isOwner &&
                        <Button onClick={() => setView("edit")}> EDIT </Button>}
                </Container>
            }

            {view === "edit" &&
                <Container maxWidth:sm>
                    <Box component="form" onSubmit={(e) => submit({ title, description, price }, e)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            label="Title"
                        />
                        <Grid container spacing={2}>
                            <Grid size={4}>
                                <Stack spacing={2}>
                                    <TextField
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        label="Description"
                                    />
                                    <TextField
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        label="Price"
                                    />
                                </Stack>
                            </Grid>
                            <Grid size={8}>
                                <div sx={{ height: '100%', boxSizing: 'border-box' }}>PICTURE</div>
                            </Grid>
                        </Grid>
                        {isOwner &&
                            <Button type="submit"> DONE </Button>}
                    </Box>
                </Container>
            }
        </Container>
    );
}


export default ItemDetail;