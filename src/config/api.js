import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { url } from './main';

const responseHandler = response => {
  const { data, status } = response;
  if (status === 200) {
    return data;
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ data, status });
};

const API = {};
const baseURL = `${url}/api`;

const axiosInstance = axios.create({
  baseURL,
  validateStatus() {
    return true;
  },
});

axiosInstance.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(responseHandler, error => {
  let msg = 'Error Interno';

  if (error.toJSON().message === 'Network Error') {
    msg = 'Error de conexión';
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ data: { msg }, status: 504 });
});

// AUTH
API.login = params => axiosInstance.post(`/login/login`, params);
API.forgot = params => axiosInstance.post(`/login/forgot`, params);
API.change = params => axiosInstance.post(`/login/change`, params);
API.register = params => axiosInstance.post(`/login/register`, params);

// Movies
API.getAllMovies = (limit, offset, filterText = '') =>
  axiosInstance.get(
    `/movies?limit=${limit}&offset=${offset}${
      filterText ? `&filter=${filterText}` : ''
    }`,
  );

export default API;
