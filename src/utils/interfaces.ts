export interface SectionData {
  name: string,
  color: string,
  lyrics: string[];
  count: number;
}

export interface AppData {
  sections: SectionData[];
  config: {
    selectedSylCount: number;
    longestSylCount: number;
  };
}
