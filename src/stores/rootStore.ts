/* eslint-disable import/no-extraneous-dependencies */
/**
 * 사용법
 * import {useDispatch, useSelector} from 'react-redux'
 * import { addItem } from 'src/stores/latestItemsSlice'
 * ...
 * const {
    latestItems // 바로 쓸 수 있음 latestItems[0] 등...
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  ...
  dispatch(addItem(newItem))
  
 */

import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer, {RootState} from '../reducers/index';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['feedVideoUpload', ''], // persist 하지 않을 것
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    });
    if (__DEV__) {
      // 개발에서만 flipper등 특정 기능 넣을 수 있음.
      return defaultMiddleware;
    }
    return defaultMiddleware;
  },
});

export type AppDispatch = typeof store.dispatch;

// export default store

const persistor = persistStore(store);

export {store, persistor};
