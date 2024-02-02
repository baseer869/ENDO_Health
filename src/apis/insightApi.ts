import axios, { AxiosRequestConfig } from 'axios';
import { api, setBaseUrl } from './apiConstants';

export const getGlucoseInsights = async (accessToken: string): Promise<InsightCard[]> => {
  const options: AxiosRequestConfig = {
    url: `${api.users.glucoseInsights}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const result = await axios.request(options);
    return result.data.insightCards as InsightCard[];
  } catch (error: any) {
    // Handle errors here
    console.error('Error:', error.message);
    return Promise.reject(error);
  }
};

//---//
type InsightCardGraph = {
  type: 'PROGRESS_CIRCLE';
  value: number;
};

type InsightCard = {
  type: 'OVERVIEW' | 'INSIGHT_CARD';
  graph?: InsightCardGraph;
  title: string;
  description: string;
  image?: string;
  link?: string;
};