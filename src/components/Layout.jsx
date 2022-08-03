import CssBaseline from '@mui/material/CssBaseline';
import { Loading } from 'components';
import { styled } from '@mui/system';

const Layout = ({ classname = {}, isLoading, children, ...props }) => {
  const MainBox = styled('main')(classname);

  return (
    <MainBox
      style={{
        position: 'relative',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
      {...props}>
      <CssBaseline />
      {children}
      {isLoading ? <Loading /> : null}
    </MainBox>
  );
};

export default Layout;
