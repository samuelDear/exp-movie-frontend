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

export const url = 'https://www.mockachino.com/06c67c77-18c4-45';

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
