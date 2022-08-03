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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: '150',
  },
  spinner: {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    borderBottom: '2px solid #FFF',
    borderLeft: '2px solid #FFF',
    borderTop: '2px solid #FFF',
    borderRight: '2px solid transparent',
    animation: `${spin} 1s infinite linear`,
  },
};

export default styles;
