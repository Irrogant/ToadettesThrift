import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, TextField } from '@mui/material';

import { useAuth } from './AuthContext'; // Access the auth context

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setIsLoggedIn, setUsername: setAuthUsername } = useAuth(); // Access the auth context's setter functions

  const handleLogin = (e) => {
    e.preventDefault();

    // Load existing users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user by username and check password
    const user = storedUsers.find((u) => u.username === username && u.password === password);

    if (user) {
      // User found, log them in
      localStorage.setItem('username', username);

      // Update context state
      setIsLoggedIn(true);
      setAuthUsername(username);

      // Navigate to homepage or dashboard after login
      navigate('/');
    } else {
      // Simulate an error (wrong credentials)
      setError('Invalid username or password');
    }
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <h2 style={{ textAlign: 'center' }}>come forth, come forth</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

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