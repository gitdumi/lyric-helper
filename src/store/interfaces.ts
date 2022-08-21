export interface MainDataState {
  songs: SongState[];
  selected: string;
  isLoggedIn: boolean;
}

export interface SongState {
  id: string;
  title: string;
  sections: SectionState[];
  config: {
    selectedSylCount: number;
    longestSylCount: number;
  };
}

export interface SectionState {
  id: string;
  name: string;
  color: string;
  lyrics: Lyric[];
  count: number;
}

export interface Lyric {
  value: string;
  id: string;
  syllableCount?: number;
}
