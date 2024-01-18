// eslint-disable-next-line import/no-extraneous-dependencies
import {combineReducers} from 'redux';
import userInfoSlice from '../stores/UserInfoStore';

const rootReducer = combineReducers({
  // latestItems: latestItemsReducer,
  userInfoStore: userInfoSlice,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
