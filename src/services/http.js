import axios from 'axios';
import store from '../store';
import router from '../router';

const http = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  config => {
    const token = store.getters.getToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response !== undefined) {
      if (error.response.status === 401) {
        store.dispatch('logout')
        router.push('/login');
      }
    }
    return Promise.reject(error);
  },
);

export default http;