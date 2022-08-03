/**
 *  Setear un mensaje por un tiempo
 *  msg: mensaje
 *  setMsg: setear mensaje
 *  Tiempo
 */
export const showMsgByTime = (msg, setMsg, time = 3000) => {
  setMsg(msg);
  setTimeout(() => {
    setMsg('');
  }, time);
};

export const url = process.env.REACT_APP_API;

export const getUserData = () => JSON.parse(localStorage.getItem('user'));

/* Funcion para cierre de sesion */
export const logout = async navigate => {
  try {
    localStorage.removeItem('sessionid');
    localStorage.removeItem('user');
    navigate('/login');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
