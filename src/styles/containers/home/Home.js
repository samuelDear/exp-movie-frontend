const styles = {
  mainBox: {
    marginTop: '40px',
    padding: '30px',
  },
  imgMovie: theme => ({
    height: '30vw',
    marginBottom: '10px',
    borderRadius: '12px',
    transition: '0.5s',
    [theme.breakpoints.down('lg')]: {
      height: '40vw',
    },
    [theme.breakpoints.down('md')]: {
      height: '50vw',
    },
    [theme.breakpoints.down('sm')]: {
      height: '90vw',
    },
  }),
  titleMovie: {
    transition: '0.5s',
  },
  movieBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    transition: '0.5s',
    marginBottom: '30px',
    '&:hover': {
      '& img': {
        transform: 'scale(1.02)',
      },
      '& p': {
        color: '#5ABCFE',
      },
    },
  },
  pageTxtBox: {
    marginRight: '15px',
  },
  selectBox: {
    margin: '0px 10px',
    '& div': {
      padding: '5px',
    },
  },
};

export default styles;
