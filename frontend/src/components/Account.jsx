import { useState } from "react";
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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function clear() {
    setOldPassword("");
    setNewPassword("");
  }

  const handleSave = () => {
    // Frontend-only validation example
    if (!newPassword) {
      setError("New password cannot be empty");
      return;
    }
    if (newPassword === oldPassword) {
      setError("New password cannot be the same as old password");
      return;
    }

    // Fake "success" — no backend
    setError("");
    setMessage("Password updated successfully (demo only)");
    setView("info");
    clear();
  };

  return (
    <Container>
      {view === "info" &&
        <Container>
          <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h5">Hello, {username}</Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Account Details</Typography>
              <Typography>Username: {username}</Typography>
            </Box>
            {message && <Typography variant="h5">{message}</Typography>}
            <Button onClick={() => setView("edit")}> Edit Password </Button>
          </Box>
        </Container>
      }

      {view === "edit" &&
        <Container>
          <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Typography variant="h5">Edit your password here</Typography>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <TextField
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              label="Old Password"
            />
            <TextField
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
            />
            <Button onClick={handleSave}> Save </Button>
            <Button onClick={() => { setView("info"); clear(); }}> Cancel </Button>
          </Box>
        </Container>
      }
    </Container>
  );
}

export default Account;