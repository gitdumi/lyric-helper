import { useEffect, useState } from 'react';
import { User } from '@firebase/auth-types';
import { loadDbData, setLoading, signIn } from '../store/mainSlice';
import firebase from '../../service/firebaseConfig';
import { read } from '../../service/firebaseDb';
import { useDispatch } from 'react-redux';

function useUser() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancel = false;

    dispatch(setLoading(true));
    firebase.auth().onAuthStateChanged((user) => {
      if (cancel) {
        dispatch(setLoading(false));
        return;
      }
      if (user) {
        setUser(user);
        dispatch(signIn(user.uid));
        console.log('Signed in');
        read(user.uid).then((result) => {
          dispatch(loadDbData(result));
        });
      } else {
        setUser(null);
        console.log('Signed out');
      }
    });
    dispatch(setLoading(false));

    return () => {
      cancel = true;
    };
  }, []);

  return user;
}

export default useUser;
