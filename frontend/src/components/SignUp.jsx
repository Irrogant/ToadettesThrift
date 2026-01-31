import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, TextField } from '@mui/material';

import useSubmit from './useSubmit';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const submit = useSubmit({
    END_URL: "signup/",
    onSuccess: () => {
      navigate("/login");
    },
    onError: (data) => setError(data.error || "Signup failed"),
    method: "POST"
  });

  return (
    <Container>
      <Box component="form" onSubmit={(e) => submit({ username, email, password }, e)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <h2 style={{ textAlign: "center" }}>thy shall giveth us thy soul</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TextField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
        />

        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />

        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />

        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default Signup;