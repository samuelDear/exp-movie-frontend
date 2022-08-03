import { keyframes } from '@mui/system';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const styles = {
  loadingBox: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '9999999',
  },
  spinner: {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    borderBottom: '6px solid #FFF',
    borderLeft: '6px solid #FFF',
    borderTop: '6px solid #FFF',
    borderRight: '6px solid transparent',
    animation: `${spin} 1s infinite linear`,
  },
};

export default styles;
