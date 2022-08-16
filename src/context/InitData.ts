import { SectionData, SongData } from '../utils/interfaces';
import { getNewKey } from '../utils/utils';
import { getRandomSection } from '../utils/constants';

export const NEW_SONG: SongData = {
  id: getNewKey(),
  title: 'New song',
  sections: [],
  config: {
    selectedSylCount: 8,
    longestSylCount: 0
  }
};

export function NEW_SECTION(): SectionData {
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

export const SAMPLE_SONGS: SongData[] = [];
