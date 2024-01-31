import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ethnicity, Gender} from 'apis/userApi';
import axios from 'axios';

interface Profile {
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
}

export interface UserInfoStore {
  userInfo?: Profile | undefined;
  platform?: string;
}

// 초기 스테이트 정의
const initialState: UserInfoStore = {userInfo: undefined, platform: ''};

const userInfoSlice = createSlice({
  name: 'userInfoStore',
  initialState,
  reducers: {
    clearUserInfo(state: UserInfoStore) {
      axios.defaults.headers.common.Authorization = '';
      return {
        ...state,
        userInfo: undefined,
        platform: '',
      };
    },
    setUserInfo(state: UserInfoStore, {payload: data}: PayloadAction<Profile>) {
      return {
        ...state,
        userInfo: {accessToken: state.userInfo?.accessToken, ...data},
      };
    },
    setPlatform(state: UserInfoStore, {payload: data}: PayloadAction<string>) {
      return {...state, platform: data};
    },
  },
});

export const {clearUserInfo, setUserInfo, setPlatform} = userInfoSlice.actions;
export default userInfoSlice.reducer;
