import axios from 'axios';

axios.defaults.withCredentials = true;

export const setBaseUrl = (baseURL: string) => {
  axios.defaults.baseURL = baseURL;
};

export const setToken = (token: string) => {
  axios.defaults.headers.common = {Authorization: `bearer ${token}`};
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
    signIn: '/auth/login',
    updatePassword:"/auth/password/me",
    preference: '/user/preference',
    moreInfo: '/user/more-info',
    user: '/user',
    referral: '/user/referral',
    glucose_insights: '/user/glucose-insights',
    withdraw: '/auth/user/me',
    glucoseInsights :'/user/glucose-insights'
  },
  alarm: {},
  medical: {
    chat: "/message/chat/medical",
    chatHistory: "/message"
  }
};
