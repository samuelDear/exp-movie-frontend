import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Button, Box, IconButton } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { headerStyles } from 'styles';
import { getUserData } from 'config';

const LazyLoading = () => {
  // state
  const [user, setUser] = useState(null);

  // Estilos
  const styles = headerStyles;
  const HeaderBox = styled('header')(styles.headerBox);
  const ButtonLogin = styled(Button)(styles.btnLogin);

  // Others
  const navigate = useNavigate();

  useEffect(() => {
    // Buscamos los datos del usuario
    const userTmp = getUserData();

    setUser(userTmp);
  }, []);

  const navigateLogin = () => navigate('/login');

  return (
    <HeaderBox>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <LocalMoviesIcon sx={styles.headerIcon} />
        {user === null ? (
          <ButtonLogin variant="primary" onClick={() => navigateLogin()}>
            Login
          </ButtonLogin>
        ) : (
          <>
            <IconButton>
              <AccountCircleIcon sx={styles.headerIcon} />
            </IconButton>
          </>
        )}
      </Box>
    </HeaderBox>
  );
};

export default LazyLoading;
