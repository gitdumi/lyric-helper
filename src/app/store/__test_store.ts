import { combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import currentSongSlice from './currentSongSlice';
import mainSlice from './mainSlice';
import { loadState, saveState } from './utils/localStorage';
import notificationSlice from './notificationSlice';

const reducers = combineReducers({
  currentSong: currentSongSlice,
  main: mainSlice,
  notifications: notificationSlice
});

// const store = configureStore({ reducer });

const testStore = createStore(reducers, composeWithDevTools());

export default testStore;

export type AppDispatch = typeof testStore.dispatch;
export type RootState = ReturnType<typeof testStore.getState>;
