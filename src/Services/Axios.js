import axios from 'axios';
import {getToken, redirectToLogin, logout} from './Auth';

export const api = axios.create();

api.interceptors.request.use(
  config => {
    const idToken = getToken();
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    } else {
      redirectToLogin();
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// Set up the interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    // console.log(error);
    if (error.response.data.error === 'token_expired' && getToken()) {
      // await axios.get('`${import.meta.env.VITE_APP_API_URL}/api/v1/auth/refresh`', {
      //     headers: {
      //         'Authorization': `Bearer ${getToken()}`,
      //     },
      // }).then((response) => {
      //     localStorage.setItem('token', response.data.id_token);
      //     return api.request(error.config);
      // }).catch((err) => {
      //     // console.log(err);
      //     // logout();
      //     // return Promise.reject(error);
      // });
      logout();
      return Promise.reject(error);
    } else {
      // console.log(err);
      // logout();
      return Promise.reject(error);
    }
  },
);
