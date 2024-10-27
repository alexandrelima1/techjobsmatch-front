// frontend/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul padrão
    },
    secondary: {
      main: '#ff4081', // Rosa secundário
    },
  },
  typography: {
    h3: {
      fontFamily: 'Roboto',
      fontWeight: 700,
    },
  },
});

export default theme;
