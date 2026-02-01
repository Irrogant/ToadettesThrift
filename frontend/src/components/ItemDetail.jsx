import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';

import { BACKEND_URL } from './variables.js';
import { useAuth } from './AuthContext';
import { useCart } from './useCart.jsx';
import useSubmit from './useSubmit.js';
import useFormSubmit from "./useFormSubmit";
import { useNavigate } from 'react-router-dom';

import coin from '../assets/icons/coin.png';

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
    const [preview, setPreview] = useState(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const url = `${BACKEND_URL}/itemdetail/?id=${encodeURIComponent(query)}`

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const submit = useSubmit({
        END_URL: `itemdetail/?id=${encodeURIComponent(query)}`,
        onSuccess: () => {
            navigate("/myitems");
        },
        onError: (data) => setError(data.error || "Deletion failed"),
        method: "DELETE"
    });

    const submitWithFormData = useFormSubmit({
        END_URL: `itemdetail/?id=${encodeURIComponent(query)}`,
        getFormData: () => {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);

            if (image) {
                formData.append("image", image);
            }

            return formData;
        },
        onSuccess: () => {
            setView("info");
            setError("");
        },
        onError: (data) => {
            setError(data.error || "Edit failed");
        },
        method: "PUT"
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

            if (item.image) {
                setPreview(`${BACKEND_URL}${item.image}`);
            }
        }
    }, [item]);

    const isOwner = (username === owner) /* if the user viewing is the one who owns the item */
    return (
        <Container>
            {view === "info" &&
                <Container>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <h2>{title}</h2>
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <Stack spacing={2}>
                                <Typography>{description}</Typography>
                                <Typography
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.25em",
                                    }}
                                >
                                    {price}
                                    <img
                                        src={coin}
                                        alt="Coin"
                                        style={{
                                            width: "1em",
                                            height: "1em",
                                        }}
                                    />
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid size={8}>
                            <Box
                                sx={{
                                    width: 250,
                                    height: 250,
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <Typography>No image</Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                    {!isOwner &&
                        <Button
                            onClick={() => {
                                addToCart(id);
                                navigate("/cart");
                            }}
                        >
                            BUY
                        </Button>}
                    {isOwner &&
                        <Button onClick={() => setView("edit")}> EDIT </Button>}
                    {isOwner &&
                        <Button color="error" onClick={() => submit()}> DELETE </Button>}
                </Container>
            }

            {view === "edit" &&
                <Container>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <Box component="form" onSubmit={submitWithFormData} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
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
                            <Box
                                onClick={() => document.getElementById("fileInput").click()}
                                sx={{
                                    width: 150,
                                    height: 150,
                                    border: "2px dashed",
                                    borderColor: "primary.main",
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <Typography>Click to upload</Typography>
                                )}

                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleUpload}
                                />
                            </Box>
                        </Grid>
                        {isOwner &&
                            <Button type="submit"> SAVE </Button>}

                    </Box>
                </Container>
            }
        </Container >
    );
}


export default ItemDetail;