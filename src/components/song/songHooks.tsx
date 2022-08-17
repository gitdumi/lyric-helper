import { SongData, SectionData } from '../../utils/interfaces';
import { useSongData } from '../../context/SongContext';
import { useEffect } from 'react';

export const useAddSection = (newSection: SectionData | undefined): void => {
  const { setSongData } = useSongData();

  useEffect(() => {
    if (newSection) {
      setSongData((prev: SongData) => {
        prev.sections = [...prev.sections, newSection];
        return { ...prev, sections: prev.sections };
      });
    }
  }, [newSection]);
};
