import { getNewKey } from '../utils/utils';
import { Lyric } from '../app/interfaces';

export function getLyric(syllableCount: number) {
  return fetchLyric().then((all) => {
    const raw = all.replace(new RegExp('^[^A-z]|[^A-z]$|[.,]'), '').split(' ');
    const result: Lyric = {
      value: '',
      syllableCount: 0,
      id: ''
    };

    return processLyric(syllableCount, raw, result);
  });
}

function fetchLyric() {
  return fetch('https://hipsum.co/api/?type=hipster-centric&sentences=1')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data[0];
    })
    .catch(function (err) {
      console.log(err);
    });
}

function processLyric(syllableCount: number, raw: string[], result: Lyric) {
  for (let index = 0; index < raw.length; index++) {
    if (result.syllableCount! < 8) {
      result = {
        value: result.value ? result.value + ' ' + raw[index] : raw[index],
        syllableCount: result.syllableCount
          ? result.syllableCount + getSyllableCount(raw[index])
          : getSyllableCount(raw[index]),
        id: getNewKey()
      };
    } else if ((result.syllableCount = syllableCount)) {
      return result;
    }
  }
  return result;
}

export function getSyllableCount(word: string) {
  let numSyllables = 0;
  let newSyllable = true;
  const vowels = 'aeiouy';
  const cArray = [...word];

  for (let i = 0; i < cArray.length; i++) {
    // dealing with lone 'e's and 'e's in the end of the word.
    if (
      i == cArray.length - 1 &&
      cArray[i].toLowerCase() == 'e' &&
      newSyllable &&
      numSyllables > 0
    ) {
      numSyllables--;
    }
    // if the syllable's character is a vowel. Then it stops and counts as a syllable.
    if (newSyllable && vowels.indexOf(cArray[i].toLowerCase()) >= 0) {
      newSyllable = false;
      numSyllables++;
    }
    // if the current character is NOT a vowel, starts the new syllable.
    else if (vowels.indexOf(cArray[i].toLowerCase()) < 0) {
      newSyllable = true;
    }
  }
  return numSyllables;
}
