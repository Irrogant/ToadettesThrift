import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useAuth } from './AuthContext';
import SearchBar from './SearchBar';
import Logo from '../assets/logo.png';

function NavBar() {
  const { isLoggedIn } = useAuth();
  return (
    <AppBar position="fixed">
      <Toolbar>

        <Link to="/">
          <Box component="img" src={Logo} alt="Logo" sx={{ verticalAlign: "middle", height: 40 }} />
        </Link>

        <Box sx={{
          flexGrow: 1,
          flexShrink: 1,
          mx: 2,
          minWidth: 100,
          maxWidth: '70vw',
        }}>
          <SearchBar />
        </Box>
        {/* If logged in, login and signup is removed, and logout is added*/}
        <Box sx={{
          display: "flex",
          gap: 1,
          flexWrap: "nowrap",
          overflow: "hidden",
          marginLeft: "auto",
          "& .MuiButton-root": {
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          },
        }}>
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
              <Button component={Link} to="/cart" color="inherit">
                <ShoppingCartIcon />
              </Button>
              <Button color="inherit" component={Link} to="/logout">Log Out</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;