import { Lyric } from '../../app/store/utils/interfaces';
import { DbLyric } from './insertLyricsInDb';
import { getNewKey } from '../../utils/utils';

export default function convertToUiLyric(dbLyric: DbLyric): Lyric {
  return {
    value: dbLyric.text,
    syllableCount: dbLyric.sylCount,
    id: getNewKey()
  };
}
