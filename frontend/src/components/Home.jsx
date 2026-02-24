import { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import Items from "./Items.jsx";
import { useTheme } from "@mui/material/styles";

function Home() {
  const [items, setItems] = useState([]);
  const theme = useTheme();

  const adGifs = [
    "/ads/food.gif",
    "/ads/car.gif",
    "/ads/wae.gif",
    "/ads/singles.gif",
    "/ads/aaa.gif",
    "/ads/ram.gif",
    "/ads/skins.gif",
    "/ads/vbuck.gif",
    "/ads/gam.gif"
  ];

  const [ads, setAds] = useState(() => Array(8).fill("").map(() => adGifs[Math.floor(Math.random() * adGifs.length)]));

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
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ position: "relative", backgroundColor: "#fff", padding: 1, boxShadow: "0 4px 15px rgba(255, 0, 127, 0.5)", border: "4px solid #ff007f", borderRadius: 3, overflow: "hidden", backgroundSize: "cover", backgroundPosition: "center" }}>
              <Box sx={{ position: "absolute", top: 5, right: 5, color: "#fff", fontWeight: "bold", fontSize: "22px", backgroundColor: "rgba(186, 81, 160, 0.8)", padding: "5px 10px", borderRadius: "50px", textTransform: "uppercase", letterSpacing: "2px", textShadow: "2px 2px 8px #fff" }}>
                AD
              </Box>
              <img
                src={ads[index]}
                alt={`Ad ${index + 1}`}
                style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 3, border: "5px solid #ff66b2", boxShadow: "0 4px 15px rgba(255, 0, 127, 0.3)" }}
              />
            </Box>
          ))}
        </Box>

        {/* Middle Column with Items */}
        <Box sx={{ flex: 2, height: "800px", }}>
          <Typography style={{ textAlign: "center", color: theme.palette.primary.main, fontSize: "80px", textShadow: "2px 2px 3px rgb(255, 255, 255)" }}>
            Toadette's Thrift
          </Typography>
          <Items items={items} />
        </Box>

        {/* Right Column with Ads */}
        <Box sx={{ width: 200, display: "flex", flexDirection: "column", gap: 2, height: "800px", padding: 2, backgroundColor: "rgba(186, 81, 160, 0.8)", position: "relative" }}>
          {[...Array(4)].map((_, index) => (
            <Box key={index + 4} sx={{ position: "relative", backgroundColor: "#fff", padding: 1, boxShadow: "0 4px 15px rgba(255, 0, 127, 0.5)", border: "4px solid #ff007f", borderRadius: 3, overflow: "hidden", backgroundSize: "cover", backgroundPosition: "center" }}>
              <Box sx={{ position: "absolute", top: 5, right: 5, color: "#fff", fontWeight: "bold", fontSize: "22px", backgroundColor: "rgba(186, 81, 160, 0.8)", padding: "5px 10px", borderRadius: "50px", textTransform: "uppercase", letterSpacing: "2px", textShadow: "2px 2px 8px #fff" }}>
                AD
              </Box>
              <img
                src={ads[index + 4]}
                alt={`Ad ${index + 5}`}
                style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 3, border: "5px solid #ff66b2", boxShadow: "0 4px 15px rgba(255, 0, 127, 0.3)" }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Home;