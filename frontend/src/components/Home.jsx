import { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import Items from "./Items.jsx";
import { useTheme } from "@mui/material/styles"; // Import the useTheme hook

function Home() {
  const [items, setItems] = useState([]);
  const theme = useTheme(); // Access the current theme

  // List of all available ads (GIFs in the 'public/ads' directory)
  const adGifs = [
    "/ads/food.gif",
    "/ads/car.gif",
    "/ads/wae.gif",
    "/ads/singles.gif", // Add as many as you have in your /ads folder
    "/ads/aaa.gif",
    "/ads/ram.gif",
    "/ads/skins.gif",
    "/ads/vbuck.gif",
    "/ads/gam.gif"
  ];

  // Function to get a random ad gif
  const getRandomAd = () => {
    const randomIndex = Math.floor(Math.random() * adGifs.length);
    return adGifs[randomIndex];
  };

  useEffect(() => {
    fetch("/items.json")
      .then((response) => response.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <Container maxWidth="false" sx={{ padding: 0, margin: 0 }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh", // Full height of the viewport
        }}
      >
        {/* Left Side Ad Stack */}
        <Box
          sx={{
            width: 200,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100vh", // Full height for the left side
            padding: 2,
          }}
        >
          <Box sx={{ backgroundColor: "#ccc", padding: 2, boxShadow: 1 }}>
            <img
              src={getRandomAd()}
              alt="Ad 1"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>
          <Box sx={{ backgroundColor: "#ccc", padding: 2, boxShadow: 1 }}>
            <img
              src={getRandomAd()}
              alt="Ad 2"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>
          <Box sx={{ backgroundColor: "#ccc", padding: 2, boxShadow: 1 }}>
            <img
              src={getRandomAd()}
              alt="Ad 3"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>
          {/* New Ad Spot */}
          <Box sx={{ backgroundColor: "#ccc", padding: 2, boxShadow: 1 }}>
            <img
              src={getRandomAd()}
              alt="Ad 4"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, padding: 2 }}>
          <h2 style={{ textAlign: "center", color: theme.palette.primary.main }}>
            Toadette's Thrift
          </h2>
          <Items items={items} />
        </Box>

        {/* Right Side Ad Stack */}
        <Box
          sx={{
            width: 200,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100vh", // Full height for the right side
            padding: 2,
          }}
        >
          <Box sx={{ backgroundColor: "#ccc", padding: 2, boxShadow: 1 }}>
            <img
              src={getRandomAd()}
              alt="Ad 5"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>
          <Box sx={{ backgroundColor: "#ccc", padding: 2, boxShadow: 1 }}>
            <img
              src={getRandomAd()}
              alt="Ad 6"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>
          {/* New Ad Spot */}
          <Box sx={{ backgroundColor: "#ccc", padding: 2, boxShadow: 1 }}>
            <img
              src={getRandomAd()}
              alt="Ad 7"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;