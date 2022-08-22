import { combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import songSlice from './slices/songSlice';
import mainSlice from './slices/mainSlice';
import { loadState, saveState } from './localStorage';

const reducers = combineReducers({ song: songSlice, main: mainSlice });

// const store = configureStore({ reducer });

const store = createStore(reducers, loadState(), composeWithDevTools());

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveState(store.getState()));

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
