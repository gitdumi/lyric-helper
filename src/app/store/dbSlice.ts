import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { DbLyric } from '../../service/lyric-db/insertLyricsInDb';
import { INITIAL_SYL_COUNT } from '../../utils/constants';

export interface DbSlice {
  [sylCount: string]: DbLyric[];
  // @ts-ignore
  currentSylCount: number;
}

const initialState = { currentSylCount: INITIAL_SYL_COUNT } as DbSlice;

export const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      console.log('setCurrent');
      console.log(action.payload);
      return {
        ...state,
        currentSylCount: action.payload
      };
    },
    addLyricGroupPerSyl: (state, action) => {
      return { ...state, [`syl_${action.payload.sylCount}`]: { ...action.payload.content } };
    }
  }
});

export const selectDbLyrics = (state: RootState): DbSlice => {
  // @ts-ignore
  return state.db[`syl_${state.db.currentSylCount}`];
};

export const selectCurrentSylCount = (state: RootState): number => {
  return state.db.currentSylCount;
};

export const { addLyricGroupPerSyl, setCurrent } = dbSlice.actions;

export default dbSlice.reducer;
