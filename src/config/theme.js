import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

const fontsFamily = ['Montserrat', 'Open-sans', 'sans-serif'].join(',');

const theme = createTheme({
  palette: {
    primary: {
      main: '#49ABED',
    },
    secondary: {
      main: '#2E8FD0',
    },
    text: {
      primary: '#010101',
    },
    background: {
      default: '#DDD',
    },
  },
  typography: {
    fontFamily: fontsFamily,
    error: {
      fontSize: 16,
      color: '#d32f2f',
      fontWeight: 400,
    },
    success: {
      fontSize: 16,
      color: 'rgb(56, 142, 60)',
      fontWeight: 400,
    },
    h1: {
      fontSize: 24,
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: 32,
      },
    },
    h2: {
      fontSize: 22,
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: 28,
      },
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: 24,
      },
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: 22,
      },
      '@media (max-width:400px)': {
        fontSize: 16,
      },
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: 20,
      },
    },
    h6: {
      fontSize: 14,
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: 18,
      },
      '@media (max-width:400px)': {
        fontSize: 12,
      },
    },
    p: {
      fontSize: 14,
      fontWeight: 400,
      '@media (min-width:600px)': {
        fontSize: 18,
      },
      '@media (max-width:400px)': {
        fontSize: 12,
      },
    },
    p2: {
      fontSize: 14,
      fontWeight: 400,
      '@media (min-width:600px)': {
        fontSize: 16,
      },
      '@media (max-width:400px)': {
        fontSize: 12,
      },
    },
    sidebar: {
      fontSize: 14,
      fontWeight: 400,
    },
    copyright: {
      fontSize: 14,
      fontWeight: 300,
      '@media (max-width:400px)': {
        fontSize: 12,
      },
    },
    button: {
      fontSize: 12,
      '@media (min-width:600px)': {
        fontSize: 14,
      },
    },
  },
  esES,
});

theme.components = {
  MuiTypography: {
    styleOverrides: {
      root: {
        wordBreak: 'break-word',
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        width: '100%',
        fontWeight: '600',
        color: '#f44336',
        textAlign: 'left',
        marginTop: 5,
        marginBottom: 6,
        marginLeft: 0,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        padding: theme.spacing(1, 3),
        borderRadius: theme.spacing(1),
        margin: 0,
        transition: '0.5s',
        fontWeight: 500,
        fontFamily: `'Open-sans', sans-serif`,
        textTransform: 'none !important',
        '&:disabled': {
          backgroundColor: 'rgba(0, 0, 0, 0.42)',
          color: '#FFFFFF',
        },
        '&:hover': {
          opacity: 0.8,
        },
      },
      secondary: {
        color: theme.palette.primary.main,
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      primary: {
        color: '#FFFFFF',
        border: '1px solid #FFFFFF',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },
      transparentWhite: {
        color: '#FFFFFF',
        border: '1px solid #FFFFFF',
      },
    },
  },
};

export default theme;
