import { SectionState } from '../../store/interfaces';
import { useSongData } from '../../context/SongContext';
import { useEffect } from 'react';
import { SongState } from '../../store/slices/songSlice';

export const useAddSection = (newSection: SectionState | undefined): void => {
  const { setSongData } = useSongData();

  useEffect(() => {
    if (newSection) {
      setSongData((prev: SongState) => {
        prev.sections = [...prev.sections, newSection];
        return { ...prev, sections: prev.sections };
      });
    }
  }, [newSection]);
};
