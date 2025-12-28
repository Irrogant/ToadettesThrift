import React, { useState } from "react";
import Button from '@mui/material/Button';
import getCookie from "./cookie";
import { useAuth } from "./AuthContext";
import { BACKEND_URL } from "./variables.js";
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import useSubmit from "./useSubmit.js";

{/* Prevent already logged in to go here */}
/* TODO: create reusable function for handleSubmit */
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const { setIsLoggedIn } = useAuth();

  const submit = useSubmit({
      END_URL: "login/", 
      JSON_DATA: {username, password},
      onSuccess: () => {
        setIsLoggedIn(true)
        navigate("/");
      },
      onError: (data) => setError(data.error || "Login failed")
    });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   const response = await fetch((`${BACKEND_URL}/login/`), {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": getCookie("csrftoken"),
  //     },
  //     body: JSON.stringify({ username, password }),
  //   });

  //   const data = await response.json();
  //   if (response.ok) {
  //     setIsLoggedIn(true);
  //     navigate("/")
  //   } else {
  //     setError(data.error || "Login failed");
  //   }
  // };

  return (
    <Container maxWidth="sm">
       <Box component="form" onSubmit={submit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
