const styles = {
  headerBox: {
    padding: '15px',
    background: '#333',
  },
  headerIcon: {
    color: '#FFF',
    width: 30,
    cursor: 'pointer',
  },
  btnLogin: {
    marginLeft: '10px',
  },
  popoverBox: {
    position: 'absolute',
    top: '35px',
    right: 0,
    zIndex: 9999,
    backgroundColor: '#EEE',
    borderRadius: '10px',
    width: '150px',
    padding: '10px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  popoverBg: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 999,
  },
  itemBox: {
    display: 'flex',
    padding: '5px',
    justifyContent: 'space-between',
  },
};

export default styles;
