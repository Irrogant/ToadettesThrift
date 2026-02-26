import { Box, Button, Container, TextField, Slider, Typography, IconButton, useTheme, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSignUp } from './useSignUp';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

function Signup() {
  const {
    username,
    password,
    error,
    handleChange,
    handleSubmit,
    setPassword, // Destructure setPassword from useSignUp
  } = useSignUp();

  const [sliderValue, setSliderValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [showDialog, setShowDialog] = useState(false);  // State for controlling the dialog visibility
  const [randomPeople, setRandomPeople] = useState(0); // State for storing the random number of people
  const theme = useTheme(); // Access the theme to get the primary color
  const navigate = useNavigate();  // Use the useNavigate hook for redirection

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    const newPassword = newValue > 0 ? `password-${newValue}` : ''; // Generate the password based on the slider
    setPassword(newPassword); // Update the password state directly
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  // Handle submit and show dialog after successful sign-up
  const handleSubmitWrapper = (e) => {
    e.preventDefault();
    handleSubmit(e); // Now handleSubmit will use the password state correctly

    // Generate a random number of people using the password (between 1 and 100)
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomPeople(randomNumber); // Set the random number of people

    // After sign-up is successful, show the dialog
    setShowDialog(true);

    // Redirect after a short delay (e.g., 3 seconds)
    setTimeout(() => {
      navigate('/login'); // Redirect to the login page
    }, 8000);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setShowDialog(false);
    navigate('/login')
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <Box component="form" onSubmit={handleSubmitWrapper} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '200px', // Set a maximum width for the form to be smaller
        width: '100%', // Ensure it doesn't expand beyond maxWidth
      }}>
        <Typography
          style={{
            fontSize: '40px',
            fontWeight: 'bold',
            color: theme.palette.primary.main, // Use the primary color for the title
            textAlign: 'center',
          }}
        >
          SIGN UP
        </Typography>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <TextField
          type="text"
          value={username}
          onChange={handleChange}
          label="Username"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
            '& .MuiInputLabel-root': {
              color: theme.palette.primary.main, // Use primary color for label
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.primary.main, // Use primary color for border
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main, // Hover effect with primary color
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main, // Focus effect with primary color
              },
            },
            '& .MuiInputBase-input': {
              color: theme.palette.primary.main, // Use primary color for input text
            },
          }}
        />

        <Box>
          {focused && (
            <Slider
              value={sliderValue}
              min={1}
              max={100}
              step={1}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `password-${value}`}
            />
          )}
          <TextField
            type={showPassword ? 'text' : 'password'}
            value={password}
            label="Password"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            sx={{
              mt: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
              '& .MuiInputLabel-root': {
                color: theme.palette.primary.main, // Use primary color for label
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary.main, // Use primary color for border
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main, // Hover effect with primary color
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main, // Focus effect with primary color
                },
              },
              '& .MuiInputBase-input': {
                color: theme.palette.primary.main, // Use primary color for input text
              },
            }}
            onFocus={handleFocus}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
          SIGN UP
        </Button>
      </Box>

      {/* Dialog for successful sign-up */}
      <Dialog open={showDialog} onClose={handleCloseDialog} maxWidth="xs">
        <DialogContent style={{ padding: "0 10px" }}>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <img
              src="/gifs/toadette_yay.gif"
              alt="Success"
              className="coupon-image"
              style={{ width: "120px", height: "120px", marginBottom: "10px" }}
            />
            <Typography variant="h6" align="center" gutterBottom>
              your password is already in use by {randomPeople} other users, so be careful xoxo
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions style={{ padding: "8px 16px" }}>
          <Button onClick={handleCloseDialog} color="primary" size="small">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Signup;