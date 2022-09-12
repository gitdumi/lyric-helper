export interface MainDataState {
  userId: string;
  songs: SongState[];
  selected: string;
  isLoggedIn: boolean;
  isGuest: boolean;
  isLoading: boolean;
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
