import { useEffect, useRef } from 'react';
import { HashRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/* Others */
import { theme } from 'config';
import Router from './Router';

const App = () => {
  const snackbar = useRef();

  useEffect(() => {
    const waitScreen = document.getElementById('waitScreen');
    if (waitScreen) {
      waitScreen.style.opacity = 0;
      setTimeout(() => {
        document.body.setAttribute('style', '');
        document.body.removeChild(waitScreen);
      }, 1000);
    }
  }, []);

  return (
    <SnackbarProvider
      ref={snackbar}
      action={key => (
        <IconButton
          aria-label="close"
          onClick={() => snackbar.current.closeSnackbar(key)}
          sx={{
            color: '#FFF',
          }}>
          <CloseIcon />
        </IconButton>
      )}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </HashRouter>
    </SnackbarProvider>
  );
};

export default App;
