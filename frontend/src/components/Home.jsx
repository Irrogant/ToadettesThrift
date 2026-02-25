import { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import Items from "./Items.jsx";
import { useTheme } from "@mui/material/styles";
import AdColumn from "./AdColumn.jsx";

function Home() {
  const [items, setItems] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetch("/items.json")
      .then((response) => response.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <Container maxWidth="false" sx={{ padding: 0, margin: 0 }}>
      <Box sx={{ display: "flex", width: "100%", height: "90vh" }}>
        {/* Left Column with Ads */}
        <Box sx={{ width: 200, display: "flex", flexDirection: "column", gap: 2, height: "800px", padding: 2, backgroundColor: "rgba(186, 81, 160, 0.8)", position: "relative" }}>
          <AdColumn count={4} />
        </Box>

        {/* Middle Column with Items */}
        <Box sx={{ flex: 2, height: "800px" }}>
          <Typography
            style={{
              textAlign: "center",
              color: theme.palette.primary.main,
              fontSize: "80px",
              textShadow: "2px 2px 3px rgb(255, 255, 255)"
            }}
          >
            Toadette's Thrift
          </Typography>
          <Items items={items} />
        </Box>

        {/* Right Column with Ads */}
        <Box sx={{ width: 200, display: "flex", flexDirection: "column", gap: 2, height: "800px", padding: 2, backgroundColor: "rgba(186, 81, 160, 0.8)", position: "relative" }}>
          <AdColumn count={4} />
        </Box>
      </Box>
    </Container>
  );
}

export default Home;