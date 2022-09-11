import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { eventSliceReducer } from './slices/events/slice';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const createDebugger = require('redux-flipper').default;
const reducers = combineReducers({

});
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['person']
// };
// const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: {
    events:eventSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

// Infer the `RootState` and `AppDispatch` types from the store itsel
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
