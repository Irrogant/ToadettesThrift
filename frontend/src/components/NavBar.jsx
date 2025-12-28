import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Logo from '../assets/logo.png';
import SearchBar from './SearchBar';
import { useAuth } from "./AuthContext";

function NavBar() {
  const { isLoggedIn } = useAuth();

  return (
    <AppBar>
      <Toolbar>

         <Box component="img" src={Logo} alt="Logo" sx={{ height: 40 }} />

         <Box sx={{ flexGrow: 2, mx: 2 }}>
         <SearchBar />
         </Box>
          {/* If logged in, login and signup is removed, a logout is added*/}
         <Box sx={{ marginLeft: "auto" }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {!isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/login">Log In</Button>
              <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/myitems">My Items</Button>
              <Button color="inherit" component={Link} to="/account">Account</Button>
              <Button color="inherit" component={Link} to="/logout">Log Out</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;