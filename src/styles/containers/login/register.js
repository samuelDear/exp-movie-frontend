import defaultStyles from './styles';

const styles = {
  ...defaultStyles,
  registerBox: theme => ({
    width: '60%',
    maxWidth: '600px',
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  }),
  inputForm: {
    margin: '25px 0px',
    marginBottom: '0px',
  },
  registerBtn: {
    marginTop: '25px',
  },
};

export default styles;
