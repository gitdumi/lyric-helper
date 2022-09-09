import { firestoreDb as db } from './firebaseConfig';
import { MainDataState } from '../app/store/utils/interfaces';

export const COLLECTION = 'lyrics';

export const writeUserData = async (collection: string, content: MainDataState) => {
  return await db
    .collection(collection)
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
  const docRef = db.collection(COLLECTION).doc(userId);

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
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
