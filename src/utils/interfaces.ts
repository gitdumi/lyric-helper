export interface SectionData {
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
