const styles = {
  mainBox: theme => ({
    marginTop: '30px',
    padding: '25px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  }),
  linkList: {
    color: '#777',
    textDecoration: 'none',
  },
  titleMovieLink: {
    color: '#000',
  },
  titleMovie: {
    margin: '15px 0px',
  },
  creatorText: {
    marginBottom: '20px',
  },
  movieMainBox: theme => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '25px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  }),
  imageMovie: theme => ({
    width: '35%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  }),
  dscMovieBox: theme => ({
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '500px',
    },
  }),
  movieImage: theme => ({
    width: '100%',
    maxWidth: '300px',
    borderRadius: '12px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '500px',
    },
  }),
};

export default styles;
