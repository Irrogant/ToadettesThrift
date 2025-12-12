import React, { useState } from "react";
import { useEffect } from "react";
import { BACKEND_URL } from "./variables.js";
import MultiActionAreaCard from "./Items.jsx";
import Grid from '@mui/material/Grid';


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
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={3} key={item.id}>
            <MultiActionAreaCard
                title={item.title}
                description={item.description}
                imageName="brussel" 
                price={item.price}
            />
            </Grid>
          ))}
        </Grid>
      );
    }


export default Home;

/*
1. ta in alla items
2. lägg in i 4 card grid
3. när man skrollar ner kommer flera items
*/