import { SectionData, SongData } from '../utils/interfaces';
import { getNewKey } from '../utils/utils';
import { COLORS } from '../lib/Theme';

export const NEW_SONG: SongData = {
  id: getNewKey(),
  title: 'New song',
  sections: [],
  config: {
    selectedSylCount: 8,
    longestSylCount: 0
  }
};

export const NEW_SECTION: SectionData = {
  id: getNewKey(),
  name: 'Verse',
  color: COLORS.GREEN,
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

export const SAMPLE_SONGS: SongData[] = [];
//     [
//     {
//         id: '1',
//         title: '1 doamne ajuta',
//         sections: [
//             {
//                 id: getNewKey(),
//                 name: '1doamne ajuta',
//                 color: COLORS.GREEN,
//                 lyrics: [{id: getNewKey(), value: "To be or not to be"}, {
//                     id: getNewKey(),
//                     value: "That is the question"
//                 }],
//                 count: 0,
//             },
//         ],
//         config: {
//             selectedSylCount: 8,
//             longestSylCount: 0,
//         }
//     }, {
//         id: '2',
//         title: '2 doamne ajuta',
//         sections: [
//             {
//                 id: getNewKey(),
//                 name: '2doamne ajuta',
//                 color: COLORS.GREEN,
//                 lyrics: [{id: getNewKey(), value: "To be or not to be"}, {
//                     id: getNewKey(),
//                     value: "That is the question"
//                 }],
//                 count: 0,
//             },
//         ],
//         config: {
//             selectedSylCount: 8,
//             longestSylCount: 0,
//         }
//     }, {
//         id: '3',
//         title: '3 doamne ajuta',
//         sections: [
//             {
//                 id: getNewKey(),
//                 name: '3doamne ajuta',
//                 color: COLORS.GREEN,
//                 lyrics: [{id: getNewKey(), value: "To be or not to be"}, {
//                     id: getNewKey(),
//                     value: "That is the question"
//                 }],
//                 count: 0,
//             },
//         ],
//         config: {
//             selectedSylCount: 8,
//             longestSylCount: 0,
//         },
//     }
// ]

export const generateNewEntity = (entity: any): typeof entity => {
  if (entity.id) {
    const newEntity = { ...entity };
    newEntity.id = getNewKey();
    return newEntity;
  }
};
