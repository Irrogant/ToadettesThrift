import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/material';

import Signup from './components/SignUp';
import Login from './components/Login';
import Account from './components/Account';
import LogOut from './components/LogOut';
import Home from './components/Home';
import Layout from './components/Layout';
import Search from './components/Search';
import ItemDetail from './components/ItemDetail';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import LandingRoute from './components/LandingRoute';
import LoggedInRoute from './components/LoggedInRoute';
import GlobalAdSpawner from './components/AdSpawner';

// privacy policy 

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <Box sx={{ position: "relative" }}>

        <GlobalAdSpawner />

        {/* 🔥 Black Screen Overlay */}
        {darkMode && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.95)",
              zIndex: 1200,
              pointerEvents: "none",
            }}
          />
        )}

        <Routes>
          <Route element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}>
            <Route element={<LandingRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/item" element={<ItemDetail />} />

              <Route element={<LoggedInRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/logout" element={<LogOut />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />
              </Route>

            </Route>
          </Route>
        </Routes>

      </Box>
    </BrowserRouter>
  );
}

export default App;