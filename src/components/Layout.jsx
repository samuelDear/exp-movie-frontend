import CssBaseline from '@mui/material/CssBaseline';
import { Loading } from 'components';
import { styled } from '@mui/system';

const MainBox = styled('main')(({ classbox }) => classbox);

const Layout = ({ classname = {}, isLoading, children, ...props }) => {
  return (
    <MainBox
      classbox={classname}
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
