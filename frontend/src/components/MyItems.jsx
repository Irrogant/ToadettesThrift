import React, {useState, useEffect} from "react";
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
    const items = useItems();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("1");
    const [price, setPrice] = useState("0");
    const [status, setStatus] = useState("");
    const [view, setView] = useState("info");
    const [error, setError] = useState("");

    function clear() {
        setTitle("");
        setDescription("");
        setAmount("1");
        setPrice("0");
        setStatus("");
    }

    const submit = useSubmit({
      END_URL: "createitem/", 
      JSON_DATA: {title, description, amount, price, status},
      onSuccess: () => {
        setView("info")
      },
      onError: (data) => setError(data.error || "Item creation failed")
    });
    /* TODO: stoppa frontend creation när de fö lite fields*/
    /* sort by category */
    /* bara edit när SA???  ah inte när sålda */
    return (
        <Container>
    
            { view === "info" && 
                <Container> 
                    <Box sx={{ mt: 2 }}>
                        <Button onClick={() => { setView("create"); clear()}} >Create Item</Button>
                        <Typography variant="h6">Your Items</Typography>
                        {items.length === 0 ? (
                            <Typography>No items LMAOOOOOOO</Typography>
                        ) : (
                            <Items items={items} />
                            // items.map((item, index) => (
                            // <Box key={index} sx={{ border: '1px solid #ccc', p: 2, mb: 1 }}>
                            //     <Typography variant="subtitle1">{item.title}</Typography>
                            //     <Typography variant="body2">{item.description}</Typography>
                            //     <Typography variant="body2">Price: ${item.price}</Typography>
                            //     <Typography variant="body2">Amount: {item.amount}</Typography>
                            //     <Typography variant="body2">Date: {item.date_added}</Typography>
                            //     <Typography variant="body2">Status: {item.status}</Typography>
                            // </Box>
                            // ))
                        )}
                    </Box>
                </Container>
            }
            
            { view === "create" &&
                <Container>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Box component="form" onSubmit={submit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                label="Amount"
                            />
                            <TextField
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                label="Price"
                            />
                            <TextField
                                type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                label="Status"
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