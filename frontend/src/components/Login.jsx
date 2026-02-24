import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, useTheme } from '@mui/material';
import { useAuth } from './AuthContext'; // Access the auth context

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setIsLoggedIn, setUsername: setAuthUsername } = useAuth(); // Access the auth context's setter functions

  const theme = useTheme(); // Access the theme to get the primary color

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
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: '200px', // Set a maximum width for the form to be smaller
          width: '100%', // Ensure it doesn't expand beyond maxWidth
        }}
      >
        <Typography
          style={{
            fontSize: '40px',
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            textAlign: 'center',
          }}
        >
          LOG IN
        </Typography>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <TextField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '& .MuiInputLabel-root': {
              color: theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& .MuiInputBase-input': {
              color: theme.palette.primary.main,
            },
          }}
        />

        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '& .MuiInputLabel-root': {
              color: theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& .MuiInputBase-input': {
              color: theme.palette.primary.main,
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          Log In
        </Button>
      </Box>
    </Container>
  );
}

export default Login;