import axios, {AxiosRequestConfig} from 'axios';
import {api, setBaseUrl} from './apiConstants';
import {Platform} from 'react-native';

export const userPatchPreference = async (
  accessToken: string,
  requestBody: UserPreferenceRequestDto,
): Promise<UserResponseDto> => {
  // Platform.OS === 'android'
  //   ? setBaseUrl('http://10.0.2.2:3000')
  //   : setBaseUrl('http://localhost:3000');
  const options: AxiosRequestConfig = {
    url: `${api.users.preference}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'PATCH',
    data: requestBody,
  };

  try {
    const result = await axios.request(options);
    console.debug('result : ' + JSON.stringify(result.data));
    return result.data;
  } catch (error: any) {
    if (error.response) {
      // 서버에서 응답을 받았지만, 에러가 발생했을 때
      // console.log('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      // console.log('Error Response Headers:', error.response.headers);
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못했을 때
      console.error('Error Request:', error.request);
    } else {
      // 요청 설정 과정에서 문제가 발생했을 때
      console.error('Error Message:', error.message);
    }
    // console.log('Error Config:', error.config);
    return Promise.resolve(error);
  }
};

export const postSignup = async (
  data: SignupRequest,
): Promise<UserResponseDto> => {
  const options: AxiosRequestConfig = {
    url: `${api.users.signup}`,
    method: 'POST',
    data,
  };
  try {
    const result = await axios.request(options);
    console.debug('result : ' + JSON.stringify(result.data));
    return result.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error Response Status:', error.response.status);
      // console.log('Error Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
};

export const getMoreInfo = async (): Promise<{currentMedication: string[]}> => {
  const options: AxiosRequestConfig = {
    url: `${api.users.moreInfo}`,
    method: 'GET',
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

export const patchMoreInfo = async (data: MoreInfoRequest): Promise<any> => {
  const options: AxiosRequestConfig = {
    url: `${api.users.moreInfo}`,
    method: 'PATCH',
    data,
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
    return Promise.reject(error);
  }
};

export const getUserInfo = async (): Promise<UserResponseDto> => {
  const options: AxiosRequestConfig = {
    url: `${api.users.user}`,
    method: 'GET',
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

axios.interceptors.request.use(function (config) {
  console.log('interpecec', JSON.stringify(config, null, 2));

  return config;
});

export type UserResponseDto = {
  id?: number;
  username: string;
  email: string;
  birthDay?: Date;
  gender?: Gender;
  height?: string;
  weight?: string;
  ethnicity?: Ethnicity;
  completed?: boolean;
  accessToken?: string;
};
export type AgreeTermsPolicy = {
  version: number;
  time: number;
  agree: boolean;
  type: 'terms' | 'privacy' | 'marketing';
};

export class UserPreferenceRequestDto {
  fcmToken?: string;
  agreeTermsPolicy?: AgreeTermsPolicy[] = [];
}

export type SignupRequest = {
  username: string;
  email: string;
  password: string;
  birthDay: Date;
  gender: string;
};

export type Gender = 'Male' | 'Female' | 'Non-binary' | 'Other';
export type Ethnicity =
  | 'White/Cauasian'
  | 'Black'
  | 'Asian'
  | 'Indigenous/Polynesian'
  | 'Hispanic'
  | 'Other';

export type MoreInfoRequest = {
  height: string;
  weight: string;
  ethnicity: string[];
  diagnosed: string;
  familyMemberHistory: string[];
  currentMedication: string[];
  dailyMedicationCount: number;
  cgmDevice: string;
};
