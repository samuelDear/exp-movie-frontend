import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import {
  Button,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { headerStyles } from 'styles';
import { getUserData, logout } from 'config';

const Header = () => {
  // state
  const [user, setUser] = useState(getUserData() ? getUserData() : null);
  const [openPopover, setOpenPopover] = useState(false);

  // Estilos
  const styles = headerStyles;
  const HeaderBox = styled('header')(styles.headerBox);
  const ButtonLogin = styled(Button)(styles.btnLogin);

  // Others
  const navigate = useNavigate();

  const navigateLogin = () => navigate('/login');

  return (
    <HeaderBox>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <LocalMoviesIcon sx={styles.headerIcon} onClick={() => navigate('/')} />
        {user === null ? (
          <ButtonLogin variant="primary" onClick={() => navigateLogin()}>
            Login
          </ButtonLogin>
        ) : (
          <Box position="relative">
            <IconButton onClick={() => setOpenPopover(true)}>
              <AccountCircleIcon sx={styles.headerIcon} />
            </IconButton>
            {openPopover ? (
              <>
                <Box sx={styles.popoverBox}>
                  <List sx={{ width: '100%' }}>
                    <ListItem disablePadding sx={styles.itemBox}>
                      <ListItemText
                        primaryTypographyProps={{
                          component: 'h1',
                          textAlign: 'center',
                          variant: 'h6',
                        }}
                        primary={user.name}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        sx={styles.itemBox}
                        onClick={() => {
                          setOpenPopover(false);
                          setUser(null);
                          logout();
                          navigate('/');
                        }}>
                        <ListItemText primary="Salir" />
                        <LogoutIcon />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
                <Box
                  onClick={() => setOpenPopover(false)}
                  sx={styles.popoverBg}></Box>
              </>
            ) : null}
          </Box>
        )}
      </Box>
    </HeaderBox>
  );
};

export default Header;
