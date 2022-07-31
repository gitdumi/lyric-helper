export async function getLyric(syllableCount: number) {
  return fetchLyric().then((all) => {
    const raw = all.replace(new RegExp("^[^A-z]|[^A-z]$|[.,]"), "").split(" ");

    let result = {
      lyric: "",
      syllableCount: 0,
    };

    return processLyric(raw, result);
  });
}

export function getLyricSync(syllableCount: number) {
  async function asyncWrapper() {
    return getLyric(syllableCount)
  }

  return asyncWrapper()
}

function fetchLyric() {
  return fetch("https://hipsum.co/api/?type=hipster-centric&sentences=1")
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

function processLyric(raw: string[], result: any) {
  for (let index = 0; index < raw.length; index++) {
    if (result.syllableCount < 8) {
      result = {
        lyric: result.lyric ? result.lyric + " " + raw[index] : raw[index],
        syllableCount: result.syllableCount
          ? result.syllableCount + getSyllableCount(raw[index])
          : getSyllableCount(raw[index]),
      };
    } else if ((result.syllableCount = 8)) {
      console.log("bines");
      return result;
    } else {
      console.log("raues");
    }
  }
  return result;
}

export function getSyllableCount(word: string) {
  let numSyllables = 0;
  let newSyllable = true;
  let vowels = "aeiouy";
  let cArray = [...word];

  for (let i = 0; i < cArray.length; i++) {
    // dealing with lone 'e's and 'e's in the end of the word.
    if (
      i == cArray.length - 1 &&
      cArray[i].toLowerCase() == "e" &&
      newSyllable &&
      numSyllables > 0
    ) {
      numSyllables--;
    }
    // if the syllable's character is a vowel. Then it stops and count as a syllable.
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
