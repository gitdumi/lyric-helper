import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBHif3P8SQ99ojYF9IV-DfAJ9ZTU4IY_Jg',
  authDomain: 'lyric-helper.firebaseapp.com',
  projectId: 'lyric-helper',
  storageBucket: 'lyric-helper.appspot.com',
  messagingSenderId: '338016070230',
  appId: '1:338016070230:web:51a9d6e55e8fea6c4329f7',
  measurementId: 'G-ZN36G1CKVB'
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const googleSignOut = async () => auth.signOut();

export default firebase;
