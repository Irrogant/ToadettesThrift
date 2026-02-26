import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useAuth } from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [passwordList, setPasswordList] = useState([]);

  const navigate = useNavigate();
  const { setIsLoggedIn, setUsername: setAuthUsername } = useAuth();
  const theme = useTheme();

  // Load stored passwords on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const passwords = storedUsers.map((user) => user.password); // Extract passwords from stored users
    setPasswordList(passwords);
  }, []);

  // ------------------------
  // Drag & Drop Handlers
  // ------------------------

  const handleDragStart = (e, letter) => {
    e.dataTransfer.setData('text/plain', letter);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('text/plain');
    setUsername((prev) => prev + letter);
  };

  const handleBackspace = () => {
    setUsername((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setUsername('');
  };

  // ------------------------
  // Login Handler
  // ------------------------

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user by matching both username and password
    const user = storedUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (user) {
      localStorage.setItem('username', username);
      setIsLoggedIn(true);
      setAuthUsername(username);
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: '260px',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: '40px',
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            textAlign: 'center',
          }}
        >
          LOG IN
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        {/* Username Field */}
        <TextField
          label="Username"
          value={username}
          onClick={() => setShowKeyboard(true)}
          InputProps={{
            readOnly: true,
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
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

        {/* Drag Keyboard - Only Visible After Click */}
        {showKeyboard && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 1,
              mt: 1,
              p: 1,
              borderRadius: 2,
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
          >
            {letters.map((letter) => (
              <Box
                key={letter}
                draggable
                onDragStart={(e) => handleDragStart(e, letter)}
                sx={{
                  padding: 1,
                  textAlign: 'center',
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  cursor: 'grab',
                  borderRadius: 1,
                  userSelect: 'none',
                  fontWeight: 'bold',
                }}
              >
                {letter}
              </Box>
            ))}

            <Button
              variant="outlined"
              onClick={handleBackspace}
              sx={{ gridColumn: 'span 3', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            >
              UNDO
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={handleClear}
              sx={{ gridColumn: 'span 4', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            >
              Clear
            </Button>
          </Box>
        )}

        {/* Password Selector */}
        <FormControl fullWidth>
          <InputLabel id="password-select-label">Password</InputLabel>
          <Select
            labelId="password-select-label"
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
          >
            {passwordList.map((pass, index) => (
              <MenuItem key={index} value={pass}>
                {pass}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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