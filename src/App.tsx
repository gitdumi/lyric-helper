import './App.css';
import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SongPage from './app/routes/songPage';
import AppMenu from './app/components/menu';
import { Box, useMediaQuery } from '@mui/material';
import LandingPage from './app/routes/landingPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectMain, setLoading } from './app/store/mainSlice';
import { useEffect } from 'react';
import { selectLatestNotification } from './app/store/notificationSlice';
import { RESPONSIVE_WIDTH } from './utils/constants';
import ResponsiveMenu from './app/routes/responsiveMenu';
import LoaderOverlay from './app/components/misc/loaderOverlay';
import PopUpMessage from './app/components/misc/popUpMessage';
import { readLyricsDb, writeLyricsDb } from './service/firebaseDb';

function App() {
  const { isLoggedIn, isGuest, isLoading } = useSelector(selectMain);
  const notification = useSelector(selectLatestNotification);
  const isResponsive = useMediaQuery(`(max-width: ${RESPONSIVE_WIDTH})`);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setLoading(false));
    }
  }, []);

  return (
    <Box className="App">
      {notification != null && <PopUpMessage messageDetails={notification} />}
      {isLoading && <LoaderOverlay />}
      {((isLoggedIn && !isResponsive) || (isGuest && !isResponsive)) && <AppMenu />}

      {/*<button onClick={writeLyricsDb}>WRITE</button>*/}
      {/*<button onClick={async () => console.log(await readLyricsDb(8))}>READ</button>*/}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="menu"
          element={isResponsive ? <ResponsiveMenu /> : <Navigate replace to="/" />}
        />
        <Route path="song">
          <Route path=":songId" element={<SongPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
