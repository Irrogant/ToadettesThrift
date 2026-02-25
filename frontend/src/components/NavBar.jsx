import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useAuth } from './AuthContext';
import SearchBar from './SearchBar';
import Logo from '../assets/logo.png';
import glow from '../assets/glow.gif';
import ChaosButton from './ChaosButton';

function NavBar({ darkMode, setDarkMode }) {
  const { isLoggedIn } = useAuth();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1300,

        backgroundImage: `url(${glow})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

        '& .MuiToolbar-root': {
          backgroundColor: darkMode
            ? 'rgba(0,0,0,0.75)'   // darker overlay in dark mode
            : 'rgba(201, 15, 161, 0.5)',
        },
      }}
    >
      <Toolbar>

        <Link to="/">
          <Box component="img" src={Logo} alt="Logo" sx={{ height: 40 }} />
        </Link>

        <Button
          color="inherit"
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </Button>

        <Box sx={{
          flexGrow: 1,
          mx: 2,
          minWidth: 100,
          maxWidth: '70vw',
        }}>
          <SearchBar />
        </Box>

        <Box sx={{
          display: "flex",
          gap: 1,
          marginLeft: "auto",
        }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",  // ensures vertical alignment
              justifyContent: "center",
            }}
          >
            <ChaosButton>
              <Button
                color="inherit"
                component={Link}
                to="/cart"
                sx={{ minWidth: 0, padding: 1 }} // optional: make it same size as other icons
              >
                <ShoppingCartIcon />
              </Button>
            </ChaosButton>
          </Box>

          <Button color="inherit" component={Link} to="/">Shop</Button>

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