import axios from 'axios';

axios.defaults.withCredentials = true;

export const setBaseUrl = (baseURL: string) => {
  axios.defaults.baseURL = baseURL;
};

export const AUTH_HEADER_KEY = 'Authorization';
export const AUTH_HEADER_VALUE = (value: string) => `Bearer ${value}`;

export const api = {
  common: {
    upload: '/apo/v1/upload',
    version: '/api/v1/version',
  },
  users: {
    signup: '/auth/registration',
    signIn: '/api/v1/user/signin',
    preference: '/user/preference',
  },
  alarm: {},
};
