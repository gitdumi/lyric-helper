import { combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import currentSongSlice from './currentSongSlice';
import mainSlice from './mainSlice';
import { loadState, saveState } from './utils/localStorage';
import notificationSlice from './notificationSlice';
import dbSlice from './dbSlice';

const reducers = combineReducers({
  currentSong: currentSongSlice,
  main: mainSlice,
  notifications: notificationSlice,
  db: dbSlice
});

// const store = configureStore({ reducer });

const store = createStore(reducers, loadState(), composeWithDevTools());

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveState(store.getState()));

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
