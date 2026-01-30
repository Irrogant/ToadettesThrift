import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';

import { ThemeProvider } from '@mui/material/styles';
import gobtheme from './theme';

import { AuthProvider } from './components/AuthContext';
import { CartProvider } from './components/CartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={gobtheme}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
