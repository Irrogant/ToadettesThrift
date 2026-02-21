import { useState } from "react";
import { useEffect } from "react";
import { BACKEND_URL } from "./variables.js";
import { Container } from "@mui/material";
import Items from "./Items.jsx"


function Home() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch((`${BACKEND_URL}/allitems/`), {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  return (
    <Container maxWidth="false">
      <h2 style={{ textAlign: "center" }}>Toadette's Thrift</h2>
      <Items items={items} />
    </Container>
  );
}


export default Home;