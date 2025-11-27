import React, { useState } from "react";
import Button from '@mui/material/Button';
import getCookie from "./cookie";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const response = await fetch("http://localhost:7000/signup/", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Signup successful!");
        } else {
            setError(data.error || "Signup failed");
        }
    };

   return (
    <form onSubmit={handleSubmit}>
      <h2>Sign tf up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
       <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button type="submit" variant="contained">Sign Up</Button>
    </form>
  );
}

export default Signup;