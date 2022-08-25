import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getNewSong } from './initData';
import { MainDataState, SongState } from './interfaces';
import { googleSignOut } from '../service/firebaseConfig';
import { COLLECTION, writeUserData } from '../service/firebaseDb';

const initialState = {
  userId: 'guest',
  songs: [],
  selected: '0',
  isLoggedIn: false,
  isGuest: false,
  isLoading: false
} as MainDataState;

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    signIn: (state, action) => {
      state.isLoggedIn = true;
      state.isGuest = false;
      state.userId = action.payload || 'guest';
    },
    loadDbData: (state, action) => {
      if (state.userId != 'guest') {
        return {
          ...state,
          songs: action.payload?.songs ?? []
        };
      }
    },
    signOut: () => {
      googleSignOut().then(() => {
        console.log('Sign out successful');
      });
      return initialState;
    },
    setGuest: (state) => {
      state.isGuest = true;
    },
    setCurrentSongId: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    addSong: (state) => {
      const updatedSongs = [...state.songs, getNewSong()];
      return {
        ...state,
        songs: updatedSongs,
        selected: updatedSongs[updatedSongs.length - 1].id ?? '0'
      };
    },
    saveSong: (state, actions: PayloadAction<SongState>) => {
      const updatedSongs: SongState[] = state.songs.map((song: SongState) => {
        if (song.id === state.selected) {
          return actions.payload;
        } else {
          return song;
        }
      });

      const updatedState = {
        ...state,
        songs: updatedSongs
      };

      writeUserData(COLLECTION, updatedState).then(() => {
        console.log('song saved in db');
      });

      return updatedState;
    },
    deleteSong: (state, actions: PayloadAction<SongState>) => {
      const songs = state.songs.filter((song) => song.id != actions.payload.id);

      const updatedState = {
        ...state,
        songs: songs,
        selected: songs.length > 0 ? songs[songs.length - 1].id : '0'
      };

      writeUserData(COLLECTION, updatedState).then(() => {
        console.log('song deleted from db');
      });

      return updatedState;
    }
  }
});

export const selectMain = (state: RootState) => state.main;

export const selectSongs = (state: RootState) => state.main.songs;

export const selectCurrentSongId = (state: RootState) => state.main.selected;

export const selectPickedSong = (state: RootState) => {
  return { ...state.main.songs.find((song) => song.id === state.main.selected) };
};

export const {
  setLoading,
  signIn,
  signOut,
  setGuest,
  addSong,
  saveSong,
  deleteSong,
  setCurrentSongId,
  loadDbData
} = mainSlice.actions;

export default mainSlice.reducer;
