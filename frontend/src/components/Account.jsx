import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Container,
} from "@mui/material";
import { useAuth } from "./AuthContext";

function Account() {
  const { username } = useAuth();
  const [view, setView] = useState("info");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [motherMaidenName, setMotherMaidenName] = useState(""); // State for mother's maiden name
  const [ssn, setSsn] = useState(""); // State for SSN
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("isProcessing") === "true") {
      setView("processing");
    }
  }, []);

  function clear() {
    setCreditCardNumber("");
    setExpirationDate("");
    setCvv("");
  }

  const handleSave = () => {
    if (!creditCardNumber || !expirationDate || !cvv) {
      setError("*ALL* CREDIT CARD INFORMATION");
      return;
    }

    sessionStorage.setItem("isProcessing", "true");
    setView("processing"); // Set to "processing" to show the processing state

    setError("");

    // Simulate processing time
    setTimeout(() => {
      setView("maidenName"); // After processing, go to maiden name input
    }, 2000); // Adjust delay as needed

    clear();
  };

  const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16); // Only numbers, max 16 digits
    if (value.length > 4) value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add spaces every 4 digits
    setCreditCardNumber(value);
  };

  const handleSsnSubmit = () => {
    if (!ssn) {
      setError("also your henkilötunnus pls ݁₊ ✮⋆˙");
      return;
    }

    setView("processing"); // Show "Processing" before submitting SSN

    // Simulate SSN processing time
    setTimeout(() => {
      setView("verifying"); // After SSN processing, go to "verifying" view
    }, 2000); // Adjust delay as needed
  };

  return (
    <Container
      sx={{
        backgroundColor: "rgba(186, 81, 160, 0.8)", // Pink transparent background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '500px',
        textAlign: 'center',
        pt: 7,
      }}
    >
      {view === "info" && (
        <Container>
          <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h5">Hello, {username}</Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Account Details</Typography>
              <Typography>Username: {username}</Typography>
            </Box>
            {message && <Typography variant="h5">{message}</Typography>}
            <Button
              onClick={() => setView("edit")}
              sx={{
                backgroundColor: "primary.main",
                color: 'white',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              Edit Account
            </Button>
          </Box>
        </Container>
      )}

      {view === "edit" && (
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '80vh',
          }}
        >
          <Typography variant="h5">Confirm your credit card to proceed with editing your account information</Typography>
          <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <TextField
              type="text"
              label="Credit Card Number"
              value={creditCardNumber}
              onChange={formatCardNumber}
              fullWidth
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                type="text"
                label="Expiration Date (MM/YY)"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                fullWidth
              />
              <TextField
                type="text"
                label="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                fullWidth
              />
            </Box>

            <Button
              onClick={handleSave}
              sx={{
                backgroundColor: "secondary.main",
                color: 'white',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Container>
      )}

      {view === "maidenName" && (
        <Container>
          <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h5">enter your Mother's Maiden Name</Typography>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <TextField
              type="text"
              label="Mother's Maiden Name"
              value={motherMaidenName}
              onChange={(e) => setMotherMaidenName(e.target.value)}
              fullWidth
            />

            <Button
              onClick={() => setView("ssn")}
              sx={{
                backgroundColor: "secondary.main",
                color: 'white',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              Next
            </Button>
          </Box>
        </Container>
      )}

      {view === "ssn" && (
        <Container>
          <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h5">Enter your Social Security Number (SSN)</Typography>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <TextField
              type="text"
              label="SSN"
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
              fullWidth
            />

            <Button
              onClick={handleSsnSubmit}
              sx={{
                backgroundColor: "secondary.main",
                color: 'white',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      )}

      {view === "processing" && (
        <Container>
          <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h5">Processing information...</Typography>
          </Box>
        </Container>
      )}

      {view === "verifying" && (
        <Container>
          <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h5">Verifying your information, check back later...</Typography>
          </Box>
        </Container>
      )}
    </Container>
  );
}

export default Account;