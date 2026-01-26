import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Button, TextField, Grid, Stack } from '@mui/material';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import { useAuth } from "./AuthContext";
import useItems from "./useItems";
import { BACKEND_URL } from "./variables.js";
import useSubmit from "./useSubmit.js";
import Items from "./Items.jsx"



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
    //console.log(items.on_sale_items)
    /* TODO: stoppa frontend creation när de fö lite fields*/
    /* sort by category */
    /* bara edit när SA???  ah inte när sålda */
    // TODO: adda clear ti change password å sånt också
    return (
        <Container>

            {view === "info" &&
                <Container>
                    <Box sx={{ mt: 2 }}>
                        <Button onClick={() => setInventory("on_sale")}>Your Items</Button>
                        <Button onClick={() => setInventory("sold")}>Sold Items</Button>
                        <Button onClick={() => setInventory("purchased")}>Purchased Items</Button>

                        {inventory === "on_sale" ? (
                            <Container>
                                <Button onClick={() => { setView("create"); clear() }}>Create Item</Button>
                                <Typography variant="h6">Your Items</Typography>
                                {items[0]?.on_sale_items?.length === 0 ? (
                                    <Typography>No items LMAOOOOOOO</Typography>
                                ) : (
                                    <Items items={items[0]?.on_sale_items || []} />
                                )}
                            </Container>
                        ) : inventory === "sold" ? (
                            <Container>
                                <Typography variant="h6">Sold Items</Typography>
                                {items[0]?.sold_items?.length === 0 ? (
                                    <Typography>No items LMAOOOOOOO</Typography>
                                ) : (
                                    <Items items={items[0]?.sold_items || []} />
                                )}
                            </Container>
                        ) : inventory === "purchased" ? (
                            <Container>
                                <Typography variant="h6">Purchased Items</Typography>
                                {items[0]?.purchased_items?.length === 0 ? (
                                    <Typography>No items LMAOOOOOOO</Typography>
                                ) : (
                                    <Items items={items[0]?.purchased_items || []} />
                                )}
                            </Container>
                        ) : null}
                    </Box>
                </Container>
            }

            {view === "create" &&
                <Container>
                    {error && <p style={{ color: "red" }}>{error}</p>}
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
                        <Button type="submit"> CREATE </Button>
                        <Button onClick={() => setView("info")}> CANCEL </Button>
                    </Box>
                </Container>
            }
        </Container>
    )
}

export default myItems;