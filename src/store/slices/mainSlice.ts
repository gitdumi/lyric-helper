import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getNewSong } from '../InitData';
import { MainDataState, SongState } from '../interfaces';

const initialState = {
  songs: [],
  selected: '0',
  isLoggedIn: false
} as MainDataState;

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setCurrentSongId: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    addSong: (state) => {
      return {
        ...state,
        songs: [...state.songs, getNewSong()]
      };
    },
    saveSong: (state, actions: PayloadAction<SongState>) => {
      const updatedSongs: SongState[] = state.songs.map((song: SongState) => {
        console.log('saving song');
        if (song.id === state.selected) {
          return actions.payload;
        } else {
          return song;
        }
      });
      return {
        ...state,
        songs: updatedSongs
      };
    },
    deleteSong: (state, actions: PayloadAction<SongState>) => {
      const songs = state.songs.filter((song) => song.id != actions.payload.id);
      return {
        ...state,
        songs: songs,
        selected: songs.length > 0 ? songs[0].id : '0'
      };
    }
  }
});

export const selectSongs = (state: RootState) => state.main.songs;

export const selectCurrentSongId = (state: RootState) => state.main.selected;

export const selectSongById = (state: typeof initialState, id: string) => {
  const index: number = state.songs.findIndex((song: SongState) => song.id === id);
  return state.songs[index];
};

export const { logIn, addSong, saveSong, deleteSong, setCurrentSongId } = mainSlice.actions;

export default mainSlice.reducer;
