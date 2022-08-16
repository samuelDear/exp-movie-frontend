import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

import { headerLoginStyles } from 'styles';

// Estilos
const styles = headerLoginStyles;
const HeaderBox = styled('header')(styles.headerBox);

const HeaderLogin = () => {
  // Others
  const navigate = useNavigate();

  return (
    <HeaderBox>
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <LocalMoviesIcon sx={styles.headerIcon} onClick={() => navigate('/')} />
      </Box>
    </HeaderBox>
  );
};

export default HeaderLogin;
