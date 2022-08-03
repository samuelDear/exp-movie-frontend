import { headerStyles } from 'styles';
import { styled } from '@mui/system';

const LazyLoading = () => {
  const styles = headerStyles;
  const HeaderBox = styled('header')(styles.headerBox);

  return (
    <HeaderBox>
      <p>hola</p>
    </HeaderBox>
  );
};

export default LazyLoading;
