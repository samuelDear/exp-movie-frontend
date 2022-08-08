import defaultStyles from './styles';

const styles = {
  ...defaultStyles,
  inputForm: {
    margin: '15px 0px',
    marginBottom: '0px',
  },
  forgotPwd: {
    marginTop: '20px',
    textDecoration: 'none',
    color: '#111',
    transition: '0.5s',
    '&:hover': {
      color: '#666',
    },
  },
};

export default styles;
