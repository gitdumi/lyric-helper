import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNewSection, getNewSong } from './initData';
import { RootState } from './store';
import { getNewKey } from '../../utils/utils';
import { SectionState, SongState } from './utils/interfaces';

const initialState = getNewSong() as SongState;

export const currentSongSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    setSong: (state, action) => {
      return { ...action.payload };
    },
    updateSongTitle: (state, action) => {
      return {
        ...state,
        title: action.payload
      };
    },
    addSection: (state) => {
      console.log('adding section');
      return {
        ...state,
        sections: [...state.sections, getNewSection()]
      };
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      const sections = state.sections.filter(
        (section: SectionState) => section.id != action.payload
      );
      return {
        ...state,
        sections: sections
      };
    },
    duplicateSection: (state, action: PayloadAction<number>) => {
      const duplicate: SectionState = { ...state.sections[action.payload] };
      duplicate.id = getNewKey();
      return {
        ...state,
        sections: [...state.sections, duplicate]
      };
    },
    reorderSections: (state, action: PayloadAction<SectionState[]>) => {
      return { ...state, sections: action.payload };
    },
    updateSectionTitle: (state, action) => {
      const { index, value } = action.payload;

      state.sections.map((section, i) => {
        if (i === index) {
          section.name = value;
        }
        return section;
      });
    },
    updateSectionColor: (state, action) => {
      const { index, color } = action.payload;

      state.sections.map((section, i) => {
        if (i === index) {
          section.color = color;
        }
        return section;
      });
    },
    updateSectionLyric: (state, action) => {
      const { sectionIndex, lyricIndex, value } = action.payload;

      state.sections.map((section, i) => {
        if (i === sectionIndex) {
          section.lyrics.map((lyric, index) => {
            if (index === lyricIndex) {
              lyric.value = value;
            }
          });
        }
        return section;
      });
    },
    addSectionLyric: (state, action) => {
      const { sectionIndex, value } = action.payload;

      state.sections[sectionIndex].lyrics = [...state.sections[sectionIndex].lyrics, value];
    },
    reorderSectionLyrics: (state, action) => {
      const { sectionIndex, lyrics } = action.payload;
      state.sections[sectionIndex].lyrics = lyrics;
    },
    deleteSectionLyric: (state, action) => {
      const { sectionIndex, lyricIndex } = action.payload;

      state.sections[sectionIndex].lyrics = state.sections[sectionIndex].lyrics.filter((lyr, i) => {
        return i != lyricIndex;
      });
    }
  }
});

export const selectCurrentSong = (state: RootState) => state.currentSong;

export const selectSections = (state: RootState) => state.currentSong.sections;

export const {
  setSong,
  updateSongTitle,
  addSection,
  duplicateSection,
  deleteSection,
  reorderSections,
  updateSectionTitle,
  updateSectionColor,
  updateSectionLyric,
  addSectionLyric,
  reorderSectionLyrics,
  deleteSectionLyric
} = currentSongSlice.actions;

export default currentSongSlice.reducer;
