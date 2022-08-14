const styles = {
  mainBox: theme => ({
    padding: '20px',
    marginTop: '30px',
    marginBottom: '35px',
    [theme.breakpoints.down('md')]: {
      padding: '15px',
      marginTop: '25px',
      marginBottom: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
      marginTop: '20px',
      marginBottom: '20px',
    },
  }),
  loginRequired: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnLoginRequired: {
    padding: '5px 15px',
    marginTop: '5px',
  },
  postCommentBtn: theme => ({
    width: '150px',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      width: '100px',
      marginTop: '10px',
    },
  }),
  commentDateTxt: {
    color: '#555',
  },
  commentTitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  commentBox: {
    width: '100%',
  },
  iconUser: theme => ({
    width: '50px',
    height: '50px',
    marginRight: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '40px',
    },
  }),
  orderSelect: {
    marginLeft: '10px',
    '& div': {
      padding: '5px',
    },
  },
  postCommentBox: theme => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  }),
  loadingBox: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
  },
  actionBox: {
    marginTop: '5px',
    marginLeft: '-10px',
  },
  modalBtnSection: theme => ({
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
    '& button': {
      margin: '6px',
      width: '50px',
    },
  }),
  deleteModalIcon: theme => ({
    color: '#444',
    width: '200px',
    height: '200px',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: '100px',
    },
  }),
  deleteModalIconBox: {
    backgroundColor: '#49ABED',
    borderRadius: 99999,
    padding: '5px',
  },
  editCommentBtn: theme => ({
    width: '150px',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      width: '100px',
      marginTop: '10px',
    },
  }),
  editCancelBtn: theme => ({
    width: '150px',
    marginLeft: '20px',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      width: '100px',
      marginTop: '10px',
      marginRight: '5px',
    },
  }),
  editButtonBox: theme => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row-reverse',
    },
  }),
};

export default styles;
