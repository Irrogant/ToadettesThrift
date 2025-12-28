import React, { useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "./variables.js";
import { Container, Grid, Stack, Button, Box, TextField } from '@mui/material';
import { useAuth } from "./AuthContext";
import getCookie from "./cookie"


function ItemForm() {

   return (     
    <Container maxWidth:sm>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                label="Title"
                                />
                        <Grid container spacing={2}>
                            <Grid size={4}>
                            <Stack spacing={2}>
                                <TextField
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                    label="Description"
                                />
                                <TextField
                                    type="number"
                                    onChange={(e) => setAmount(e.target.value)}
                                    label="Amount"
                                />
                                <TextField
                                    type="number"
                                    onChange={(e) => setPrice(e.target.value)}
                                    label="Price"
                                />
                                <TextField
                                    type="text"
                                    onChange={(e) => setStatus(e.target.value)}
                                    label="Status"
                                />
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
            
        )
    }
