import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Items from "./Items.jsx";
import AdColumn from "./AdColumn.jsx";
import { getCookie, setCookie } from "./cookie.js";

function Home() {
  const [items, setItems] = useState([]);
  const [openPolicy, setOpenPolicy] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Fetch items
    fetch("/items.json")
      .then((response) => response.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.error("Error fetching items:", error));

    // Check if privacy policy was already accepted
    const alreadyAccepted = getCookie("already_landed");
    if (!alreadyAccepted) {
      setOpenPolicy(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie("already_landed", "true", { expires: 365 });
    setOpenPolicy(false);
  };

  return (
    <>
      {/* Privacy Policy Dialog */}
      <Dialog open={openPolicy} disableEscapeKeyDown>
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            textAlign: "center"
          }}
        >
          Privacy Policy
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{
            color: theme.palette.primary.main
          }}>
            Welcome to Toadette's Thrift! We use cookies to improve our
            experience and analyze you; by clicking "Accept", you not
            only give up your data but also your soul ♥︎
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAccept}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Page Layout */}
      <Container maxWidth="false" sx={{ padding: 0, margin: 0 }}>
        <Box sx={{ display: "flex", width: "100%", height: "90vh" }}>

          {/* Left Ads */}
          <Box
            sx={{
              width: 200,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "800px",
              padding: 2,
              backgroundColor: "rgba(186, 81, 160, 0.8)"
            }}
          >
            <AdColumn count={4} />
          </Box>

          {/* Middle Content */}
          <Box sx={{ flex: 2, height: "800px" }}>
            <Typography
              sx={{
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

          {/* Right Ads */}
          <Box
            sx={{
              width: 200,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "800px",
              padding: 2,
              backgroundColor: "rgba(186, 81, 160, 0.8)"
            }}
          >
            <AdColumn count={4} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Home;