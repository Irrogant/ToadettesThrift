import { useState, useEffect } from 'react';

import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';

import useItems from './useItems';
import useSubmit from './useSubmit.js';
import Items from './Items.jsx';

import AddBoxIcon from '@mui/icons-material/AddBox';


function myItems() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("0");
    const [view, setView] = useState("info");
    const [inventory, setInventory] = useState("on_sale")
    const [error, setError] = useState("");

    function clear() {
        setTitle("");
        setDescription("");
        setPrice("0");
    }

    const { items, refetch } = useItems({
        END_URL: "myitems/"
    });

    const submit = useSubmit({
        END_URL: "createitem/",
        JSON_DATA: { title, description, price },
        onSuccess: () => {
            setView("info"),
                refetch()
        },
        onError: (data) => setError(data.error || "Item creation failed")

    });

    useEffect(() => {
        console.log("Items updated:", items);
        console.log("AAAAAAAAAajdaionflwka", items[0]?.on_sale_items)
    }, [items]);

    // TODO: adda clear ti change password å sånt också
    return (
        <Container>

            {view === "info" &&
                <Container>
                    <Box>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
                            <Button onClick={() => setInventory("on_sale")}>Your Items</Button>
                            <Button onClick={() => setInventory("sold")}>Sold Items</Button>
                            <Button onClick={() => setInventory("purchased")}>Purchased Items</Button>
                        </Box>

                        {inventory === "on_sale" ? (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                                <Typography variant="h6" align="center">Your Items</Typography>
                                <Button onClick={() => { setView("create"); clear(); }} sx={{ mb: 2 }}>
                                    <AddBoxIcon fontSize="large" />
                                </Button>
                                {items[0]?.on_sale_items?.length === 0 ? (
                                    <Typography>No items LMAOOOOOOO</Typography>
                                ) : (
                                    <Items items={items[0]?.on_sale_items || []} />
                                )}
                            </Box>
                        ) : inventory === "sold" ? (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                                <Typography variant="h6">Sold Items</Typography>
                                {items[0]?.sold_items?.length === 0 ? (
                                    <Typography>No items LMAOOOOOOO</Typography>
                                ) : (
                                    <Items items={items[0]?.sold_items || []} />
                                )}
                            </Box>
                        ) : inventory === "purchased" ? (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                                <Typography variant="h6">Purchased Items</Typography>
                                {items[0]?.purchased_items?.length === 0 ? (
                                    <Typography>No items LMAOOOOOOO</Typography>
                                ) : (
                                    <Items items={items[0]?.purchased_items || []} />
                                )}
                            </Box>
                        ) : null}
                    </Box>
                </Container>
            }

            {view === "create" &&
                <Container>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <Box component="form" onSubmit={(e) => submit({ title, description, price }, e)} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
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
                        <Button type="submit"> CREATE </Button>
                        <Button onClick={() => setView("info")}> CANCEL </Button>
                    </Box>
                </Container>
            }
        </Container>
    )
}

export default myItems;