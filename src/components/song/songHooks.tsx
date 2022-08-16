import { SongData, SectionData } from '../../utils/interfaces';
import { useSongData } from '../../context/SongContext';
import { useEffect } from 'react';

export function useAddSection(newSection: SectionData) {
  const { setSongData } = useSongData();

  useEffect(() => {
    if (newSection) {
      setSongData((prev: SongData) => {
        prev.sections = [...prev.sections, newSection];
        return { ...prev, sections: prev.sections };
      });
    }
  }, [newSection]);
}
