import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import gobtheme from './theme'; // importing own font etc

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={gobtheme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
