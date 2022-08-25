import { Box, Button, shouldSkipGeneratingVar, Typography } from '@mui/material';
import { theme } from '../../lib/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { loadDbData, selectMain, setGuest, setLoading, signIn } from '../mainSlice';
import { signInWithGoogle } from '../../service/firebaseConfig';
import { useEffect, useState } from 'react';
import firebase from '../../service/firebaseConfig';
import { User } from '@firebase/auth-types';
import { read } from '../../service/firebaseDb';

function LandingPage() {
  const { isLoggedIn, isGuest, isLoading } = useSelector(selectMain);
  const dispatch = useDispatch();
  // @ts-ignore
  const [user, setUser] = useState<User>(null);

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
        // @ts-ignore
        setUser(null);
        console.log('Signed out');
      }
    });
    dispatch(setLoading(false));

    return () => {
      cancel = true;
    };
  }, []);

  function handleSignInClick() {
    dispatch(setLoading(true));
    signInWithGoogle().then((result) => {
      dispatch(signIn(result.user?.uid));
      dispatch(setLoading(false));
    });
  }

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh',
        ml: isLoggedIn || isGuest ? '3rem' : '0'
      }}
    >
      {isLoading && <Typography color="red">LOADING</Typography>}
      <Box
        display="inline"
        sx={{
          flexDirection: 'row'
        }}
      >
        {(isLoggedIn || isGuest) && (
          <>
            <img
              style={{ width: '40px', borderRadius: '50%' }}
              src={`${
                user?.photoURL ||
                'https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png'
              }`}
            />
            <Typography variant="body2">
              {isLoggedIn && user != null ? user?.displayName : 'Guest'}
            </Typography>
          </>
        )}
      </Box>

      <Typography variant="h2" color={theme.palette.primary.main} sx={{ mt: '2rem' }}>
        welcome to Lyric Helper!
      </Typography>
      <Typography
        variant="h6"
        sx={{
          m: '3rem 0 0 2rem'
        }}
      >
        {isLoggedIn || isGuest ? (
          'hover over the panel to get started'
        ) : (
          <>
            <Button variant="contained" onClick={handleSignInClick}>
              Sign In
            </Button>

            <Button variant="outlined" onClick={() => dispatch(setGuest())}>
              continue as guest
            </Button>
          </>
        )}
      </Typography>
      {isGuest && (
        <Typography
          variant="body1"
          color={theme.palette.primary.main}
          sx={{
            m: '3rem 0 0 2rem'
          }}
        >
          NOTE: as a guest you can only save songs locally. <br /> If you clear your browser data
          your songs will be lost.
        </Typography>
      )}
    </Box>
  );
}

export default LandingPage;
