import { firestoreDb as db } from './firebaseConfig';
import { MainDataState, SongState } from '../app/interfaces';

export const COLLECTION = 'lyrics';

interface userDbData {
  uid: string;
  songs: SongState[];
  lastUpdated: Date;
}

export const writeUserData = async (collection: string, content: MainDataState) => {
  console.log('writeuserdatafunc');
  console.log({ content });
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

// 1. If the user is not logged in, everything is kept in localstorage and not saved ------ done
// 1.1. if the user is not logged in, he should not have db write privileges ---- done
// 2. If the user is logged in, the data should be initialized from the database, and any save action should also do a save in the database
// 3. If the user has local stuff saved and then signs in, the local snapshot should be saved to the db for the user
// ?? What if the user has data stored in the db, adds some songs as a guest and then signs in? I think local songs should be appended to db songs and then saved
