import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, TextField } from '@mui/material';

import { useAuth } from './AuthContext';
import useSubmit from './useSubmit.js';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const { setIsLoggedIn } = useAuth();

  const submit = useSubmit({
    END_URL: "login/",
    JSON_DATA: { username, password },
    onSuccess: () => {
      setIsLoggedIn(true)
      navigate("/");
    },
    onError: (data) => setError(data.error || "Login failed"),
    method: "POST"
  });

  return (
    <Container>
      <Box component="form" onSubmit={(e) => submit({ username, password }, e)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <h2 style={{ textAlign: "center" }}>come forth, come forth</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <TextField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
        />

        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />

        <Button type="submit" variant="contained">
          Log In
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
