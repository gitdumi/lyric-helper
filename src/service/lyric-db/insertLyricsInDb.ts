import raw from './lyrics_raw.txt';
import { MAX_SYL_COUNT, MIN_SYL_COUNT } from '../../utils/constants';
import { syllable } from 'syllable';

export interface DbLyric {
  text: string;
  sylCount: number;
  keywords: string[];
}

const readRawLyrics = () => {
  return fetch(raw)
    .then((r) => r.text())
    .then((text) => {
      const processed = text
        .split('\n')
        .map<DbLyric>((text) => convertRawLyricToFinalObject(text))
        .filter((lyr) => lyr.sylCount >= MIN_SYL_COUNT && lyr.sylCount <= MAX_SYL_COUNT);
      return categorizeLyrics(processed);
    });
};

const convertRawLyricToFinalObject = (raw: string): DbLyric => {
  const clean = raw.trim().replace(/[^A-z]{1}$|^[^A-z]{1}/g, '');
  const result = clean.charAt(0).toUpperCase() + clean.slice(1);

  if (!!clean && syllable(result) >= MIN_SYL_COUNT) {
    return {
      text: result,
      sylCount: syllable(result),
      keywords: []
    };
  } else {
    return {
      text: '',
      sylCount: 0,
      keywords: []
    };
  }
};

const categorizeLyrics = (allLyrics: DbLyric[]) => {
  let result: any = {};

  allLyrics.forEach((dbLyric) => {
    const current = `syl_${dbLyric.sylCount}`;

    if (!result[current]) {
      result[current] = { lyrics: [], count: 0 };
    }

    result[current].lyrics = [...result[current].lyrics, dbLyric];
    result[current].count++;
  });

  return result;
};

export default readRawLyrics;
