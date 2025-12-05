import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import gobtheme from './theme'; // importing own font etc
import { AuthProvider } from "./components/AuthContext"; // importing to check login status

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={gobtheme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
