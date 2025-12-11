import React, { useState } from "react";
import Button from '@mui/material/Button';
import getCookie from "./cookie";
import { useAuth } from "./AuthContext";
import { BACKEND_URL } from "./variables.js";
import { useNavigate } from 'react-router-dom'

{/* Prevent already logged in to go here */}
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch((`${BACKEND_URL}/login/`), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setIsLoggedIn(true);
      navigate("/")
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button type="submit" variant="contained">Log In</Button>
    </form>
  );
}

export default Login;
