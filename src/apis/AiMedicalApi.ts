import axios, {AxiosRequestConfig} from 'axios';
import {api, setBaseUrl} from './apiConstants';

  // Message History
  export const chatHistory = async (payload: any): Promise<any> => {
    const options: AxiosRequestConfig = {
      url: `${api.medical.chatHistory}?after=${payload.afterDate}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
      },
    };
    try {
      const result = await axios.request(options);
  
      return result.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Error Response Status:', error.response);
        // console.log('Error Response Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
      return Promise.resolve(error);
    }
  };