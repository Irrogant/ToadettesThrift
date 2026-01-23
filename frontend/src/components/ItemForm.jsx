import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "./variables.js";
import { Container, Grid, Stack, Button, Box, TextField } from '@mui/material';
import { useAuth } from "./AuthContext.jsx";
import getCookie from "./cookie.js"
import useSubmit from "./useSubmit.js";


/* TODO: refresha items efter creation; varje gång setview info */

function ItemDetail() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("id");
    const [item, setItem] = useState(null);
    const [error, setError] = useState("");
    const [owner, setOwner] = useState("");
    const { username, email } = useAuth();
    const [view, setView] = useState("info");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const url = `${BACKEND_URL}/createitem}`

    const submit = useSubmit({
        END_URL: "createitem/",
        JSON_DATA: { title, description, price },
        onSuccess: () => {
            setView("info");
        },
        onError: (data) => setError(data.error || "Item creation failed")
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
    //     setError(data.error || "Item creation failed lmao");
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
            setTitle(item.title);
            setDescription(item.description);
            setPrice(item.price);
        }
    }, [item]);

    const isOwner = (username === owner) /* if the user viewing is the one who owns the item */

    /*TODO: when submitted, go to itemdetail*/
    return (
        <Container maxWidth:sm>
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