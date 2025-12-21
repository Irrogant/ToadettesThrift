import React, { useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "./variables.js";
import { Container, Grid, Stack, Button, Box, TextField } from '@mui/material';
import { useAuth } from "./AuthContext";


/*TODO: edit product */

function ItemDetail() {  
    const [searchParams] = useSearchParams();
    const query = searchParams.get("id");
    const [item, setItem] = useState(null);
    const [error, setError] = useState("");
    const [owner, setOwner] = useState("");
    const { username, email } = useAuth();
    const [view, setView] = useState("info");
    const [title, setTitle] = useState("");

    const url = `${BACKEND_URL}/itemdetail/?id=${encodeURIComponent(query)}`

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ title }),
        });

        const data = await response.json();
        if (response.ok) {
        setView("info");
        } else {
        setError(data.error || "Edit failed");
        }
  };    

    useEffect(() => {

        const fetchItem = async () => {
        try {
            const response = await fetch( url,
            { method: "GET", credentials: "include",});

            if (!response.ok) {throw new Error("Failed to fetch item");}

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

    const isOwner = (username === owner) /* if the user viewing is the one who owns the item */

    return (
        <Container maxWidth:sm>
        { view === "info" && 
            <Container maxWidth:sm>
                <h2>{item?.title}</h2>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Stack spacing={2}>
                        <div>{item?.description}</div>
                        <div>{item?.amount}</div>
                        <div>{item?.price}</div>
                        <div>{item?.status}</div>
                        </Stack>
                    </Grid>
                    <Grid size={8}>
                        <div sx={{ height: '100%', boxSizing: 'border-box' }}>PICTURE</div>
                    </Grid>
                    </Grid>
            { !isOwner &&
            <Button> BUY </Button> }
            { isOwner &&
            <Button onClick={() => setView("edit")}> EDIT </Button> }
            </Container>
        }

        { view === "edit" &&
            <Container maxWidth:sm>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                       <TextField
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            label="Title"
                            />
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <Stack spacing={2}>
                            <div>{item?.description}</div>
                            <div>{item?.amount}</div>
                            <div>{item?.price}</div>
                            <div>{item?.status}</div>
                            </Stack>
                        </Grid>
                        <Grid size={8}>
                            <div sx={{ height: '100%', boxSizing: 'border-box' }}>PICTURE</div>
                        </Grid>
                        </Grid>
                { isOwner &&
                <Button type="submit"> DONE </Button> }
                </Box>
            </Container>
        }
        </Container>
    );
}

/*

<Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <h2 style={{ textAlign: "center" }}>come forth, come forth</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TextField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
        />
        
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />
        
        <Button type="submit" variant="contained">
          Log In
        </Button>
        </Box>



*/


export default ItemDetail;