// theme.js
import { createTheme } from '@mui/material/styles';

const gobtheme = createTheme({
  typography: {
    fontFamily: 'PixelFont, Arial, sans-serif',
    button: {
      fontSize: '1.8rem', // all buttons now bigger
    },
  },
    palette: {
        primary: {
        main: 'rgba(55, 71, 55, 1)', // default primary color (e.g., AppBar, buttons)
        contrastText: '#fff', // text color on primary
        },
        secondary: {
        main: '#f1ca5dff', // default secondary color
        contrastText: '#fff',
        },
    },
});

export default gobtheme;