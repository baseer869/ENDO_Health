// eslint-disable-next-line import/no-extraneous-dependencies
import {combineReducers} from 'redux';
import userInfoSlice from '../stores/UserInfoStore';
import insightSlice from '../stores/InsightStore';

const rootReducer = combineReducers({
  // latestItems: latestItemsReducer,
  userInfoStore: userInfoSlice,
  insightStore: insightSlice,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
