import { getNewKey } from '../utils/utils';
import { getRandomSection } from '../utils/constants';
import { SongState } from '../store/slices/songSlice';
import { SectionState } from '../store/slices/sectionSlice';

export function getNewSong(): SongState {
  return {
    id: getNewKey(),
    title: 'New song',
    sections: [],
    config: {
      selectedSylCount: 8,
      longestSylCount: 0
    }
  };
}

export function getNewSection(): SectionState {
  const randomSection = getRandomSection();

  return {
    id: getNewKey(),
    name: randomSection.name,
    color: randomSection.color,
    lyrics: [
      {
        id: getNewKey(),
        value: 'To be or not to be'
      },
      {
        id: getNewKey(),
        value: 'That is the question'
      }
    ],
    count: 0
  };
}

export const generateNewEntity = (entity: any): typeof entity => {
  if (entity.id) {
    const newEntity = { ...entity };
    newEntity.id = getNewKey();
    return newEntity;
  }
};

export const SAMPLE_SONGS: SongState[] = [];
