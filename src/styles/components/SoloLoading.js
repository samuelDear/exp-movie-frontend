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
  spinner: {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    borderBottom: '6px solid #111',
    borderLeft: '6px solid #111',
    borderTop: '6px solid #111',
    borderRight: '6px solid transparent',
    animation: `${spin} 1s infinite linear`,
  },
};

export default styles;
