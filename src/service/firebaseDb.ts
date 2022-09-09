import { firestoreDb as db } from './firebaseConfig';
import { MainDataState } from '../app/store/utils/interfaces';
import readRawLyrics from './lyric-db/insertLyricsInDb';

export const USER_DATA_COLLECTION = 'user-data';
export const LYRICS_COLLECTION = 'lyrics';

export const writeLyricsDb = async () => {
  const lyrics = await readRawLyrics();

  for (const category of Object.keys(lyrics)) {
    await db
      .collection(LYRICS_COLLECTION)
      .doc(category)
      .set({
        ...lyrics[category]
      })
      .then(() => {
        console.log('db write completed');
      })
      .catch((e) => console.log('write error', e));
  }
};

export const readLyricsDb = async (sylCount: number) => {
  const docRef = db.collection(LYRICS_COLLECTION).doc(`syl_${sylCount}`);

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};

export const writeUserData = async (content: MainDataState) => {
  return await db
    .collection(USER_DATA_COLLECTION)
    .doc(content.userId)
    .set({
      songs: content.songs,
      lastUpdated: new Date()
    })
    .then(() => {
      console.log('db write completed');
    })
    .catch((e) => console.log('write error', e));
};

export const read = async (userId: string) => {
  const docRef = db.collection(USER_DATA_COLLECTION).doc(userId);

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};
