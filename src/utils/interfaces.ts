export interface SectionData {
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

export interface SongData {
  id: string;
  title: string;
  sections: SectionData[];
  config: {
    selectedSylCount: number;
    longestSylCount: number;
  };
}
