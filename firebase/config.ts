// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBHif3P8SQ99ojYF9IV-DfAJ9ZTU4IY_Jg',
  authDomain: 'lyric-helper.firebaseapp.com',
  projectId: 'lyric-helper',
  storageBucket: 'lyric-helper.appspot.com',
  messagingSenderId: '338016070230',
  appId: '1:338016070230:web:51a9d6e55e8fea6c4329f7',
  measurementId: 'G-ZN36G1CKVB'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
