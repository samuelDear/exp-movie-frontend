const styles = {
  mainBox: {
    borderRadius: 27,
  },
  rootTitle: theme => ({
    margin: 0,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > img': {
      width: 60,
      marginRight: theme.spacing(2),
    },
  }),
  content: theme => ({
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: 4,
      height: 4,
      borderRadius: 4,
      background: 'rgba(157, 177, 187, 0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.primary.dark,
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 0),
    },
  }),
  closeButton: theme => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#FFF',
    padding: 5,
    border: '2px solid #FFF',
    background: 'rgba(0, 0, 0, 0.42)',
  }),
  rootActions: {
    justifyContent: 'center',
    padding: 15,
  },
};

export default styles;
