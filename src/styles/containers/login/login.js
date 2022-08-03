const styles = {
  mainBox: {
    background: '#555',
    minHeight: '100vh',
    width: '100%',
  },
  loginBox: theme => ({
    background: '#FFF',
    display: 'flex',
    width: '50%',
    borderRadius: '12px',
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  }),
  titleLogin: {
    marginBottom: '15px',
  },
  inputForm: {
    margin: '15px 0px',
    marginBottom: '30px',
  },
  loginButton: {
    marginTop: '15px',
  },
  forgotPwd: {
    marginTop: '30px',
    textDecoration: 'none',
    color: '#111',
  },
};

export default styles;
