import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D65A31',
      light: '#F79D65',
      dark: '#C44536',
      contrastText: '#fff',
    },
    secondary: {
      main: '#8B5E3C',
      light: '#F2E3D5',
      contrastText: '#fff',
    },
    background: {
      default: '#FFF8F4',
      paper: '#F2E3D5',
    },
    text: {
      primary: '#3E2A1E',
      secondary: '#8B5E3C',
    },
    error: {
      main: '#C44536',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
