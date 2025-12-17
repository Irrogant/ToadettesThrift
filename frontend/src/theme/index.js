// theme.js
import { createTheme } from '@mui/material/styles';

const gobtheme = createTheme({
  typography: {
    fontFamily: 'PixelFont, Arial, sans-serif',
    button: {
      fontSize: '1.8rem',
    },
  },
    palette: {   
        primary: {
        main: 'rgba(55, 71, 55, 1)',
        contrastText: '#fff',
        },
        secondary: {
        main: '#f1ca5dff',
        contrastText: '#fff',
        },
    },
});

export default gobtheme;