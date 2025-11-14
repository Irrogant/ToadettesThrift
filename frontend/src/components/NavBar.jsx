import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Logo from '../assets/logo.png';
import SearchBar from './SearchBar';

function NavBar() {
  const options = ["Test", "Testhh", "TUSTHHH"];

  return (
    <AppBar position="fixed">
      <Toolbar>

         <Box component="img" src={Logo} alt="Logo" sx={{ height: 40 }} />

         <Box sx={{ flexGrow: 1, mx: 2 }}>
         <SearchBar options={options} />
         </Box>

         <Box sx={{ marginLeft: "auto" }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/login">Log In</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;