import axios from 'axios';
import { getVarEnv } from '../helpers/getVarEnv';

const { VITE_URL_API } = getVarEnv();

const ecommerceURL = VITE_URL_API;

const ecommerceApi = axios.create({
  baseURL: ecommerceURL,
});

ecommerceApi.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default ecommerceApi;
