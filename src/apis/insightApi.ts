import axios, {AxiosRequestConfig} from 'axios';
import {api, setBaseUrl} from './apiConstants';


export const getGlucoseInsights = async (accessToken: string,): Promise<InsightCard[]> => {
    
    const options: AxiosRequestConfig = {
      url: `${api.users.glucoseInsights}`, 
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    try {
      const result = await axios.request(options);
      return result.data?.insightCards as InsightCard[];
    } catch (error: any) {
      // Handle errors here
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  };


//-- Modal --//
interface InsightCard {
    type: string;
    graph?: {
      type: string;
      value: number;
    };
    title: string;
    description: string;
  }