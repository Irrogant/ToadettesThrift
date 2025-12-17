import React, { useState } from "react";
import { useEffect } from "react";
import { BACKEND_URL } from "./variables.js";
import MultiActionAreaCard from "./Items.jsx";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function Home() {

      const [items, setItems] = useState([]);
    
      useEffect(() => {
        fetch((`${BACKEND_URL}/`), {
          credentials: 'include',
        })
          .then((response) => response.json())
          .then((data) => setItems(data.items))
          .catch((error) => console.error('Error fetching items:', error));
      }, []); 
    
      return (
        <Box  sx={{
        height: 1/4,
        width: 2/4,
        mx: "auto",
      }}>
            <Grid container spacing={2} justifyContent="center"> {items.map((item) => (
                <Grid key={item.id} xs={4}>
                <MultiActionAreaCard
                    title={item.title}
                    description={item.description}
                    imageName="brussel"
                    price={item.price}
                    dateAdded={item.date_added}
                />
                </Grid>
            ))}
            </Grid>
        </Box>
      );
    }


export default Home;