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
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
          '& .MuiInputLabel-root': {
            color: '#888888',
          },
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#444444',
          },
        },
      },
    },
  },

});

export default gobtheme;