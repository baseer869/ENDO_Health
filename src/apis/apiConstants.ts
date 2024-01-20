import axios from 'axios';

axios.defaults.withCredentials = true;

export const setBaseUrl = (baseURL: string) => {
  axios.defaults.baseURL = baseURL;
};

export const api = {
  common: {
    upload: '/apo/v1/upload',
    version: '/api/v1/version',
  },
  users: {
    signup: '/api/v1/user/signup',
    signIn: '/api/v1/user/signin',
  },
  alarm: {},
};
