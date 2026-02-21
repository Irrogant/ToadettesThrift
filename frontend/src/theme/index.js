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
      main: 'rgb(216, 96, 174)',
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
            color: '#ffffff',
          },
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0c0c8',
          },
        },
      },
    },
  },

});

export default gobtheme;