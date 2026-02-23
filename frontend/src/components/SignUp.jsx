import { Box, Button, Container, TextField, Slider, Typography, IconButton } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSignUp } from './useSignUp';

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

  const handleSubmitWrapper = (e) => {
    e.preventDefault();
    handleSubmit(e); // Now handleSubmit will use the password state correctly
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmitWrapper} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TextField
          type="text"
          value={username}
          onChange={handleChange}
          label="Username"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography gutterBottom>Password Strength</Typography>
          {focused && (
            <Slider
              value={sliderValue}
              min={1}
              max={10}
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
            sx={{ mt: 2 }}
            onFocus={handleFocus}
          />
        </Box>
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default Signup;