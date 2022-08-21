import { SectionState, SongState } from '../../store/interfaces';
import { useSongData } from '../../context/SongContext';
import { useEffect } from 'react';

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
