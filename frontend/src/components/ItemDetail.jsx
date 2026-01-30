import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material';

import { BACKEND_URL } from './variables.js';
import { useAuth } from './AuthContext';
import { useCart } from './useCart.jsx';
import useSubmit from './useSubmit.js';

/*TODO: edit product */
// TODO: remove BUY when already in cart
// TODO: 
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
    const [image, setImage] = useState(null);
    const { addToCart } = useCart();

    const url = `${BACKEND_URL}/itemdetail/?id=${encodeURIComponent(query)}`

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const submit = useSubmit({
        END_URL: `itemdetail/?id=${encodeURIComponent(query)}`,
        JSON_DATA: { title, description, price },
        onSuccess: () => {
            setView("info");
        },
        onError: (data) => setError(data.error || "Edit failed")
    });

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
    // DELETE ITEM!!
    return (
        <Container>
            {view === "info" &&
                <Container>
                    {error && <p style={{ color: "red" }}>{error}</p>}
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
                <Container>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <Box component="form" onSubmit={(e) => submit({ title, description, price }, e)} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
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
                                <Button variant="contained" component="label">
                                    Upload Picture
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleUpload}
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                        {isOwner &&
                            <Button type="submit"> DONE </Button>}
                    </Box>
                </Container>
            }
        </Container >
    );
}


export default ItemDetail;