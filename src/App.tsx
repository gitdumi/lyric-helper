import './App.css';
import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SongPage from './app/components/song/SongPage';
import AppMenu from './app/components/menu/AppMenu';
import { Box, Typography } from '@mui/material';
import LandingPage from './app/components/LandingPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectMain, setLoading } from './app/mainSlice';
import { useEffect } from 'react';

function App() {
  const { isLoggedIn, isGuest, isLoading } = useSelector(selectMain);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('effect app');
    if (isLoggedIn) {
      dispatch(setLoading(false));
    }
  }, []);

  console.log('load', isLoading);
  console.log(isLoggedIn);

  return (
    <Box
      display="flex"
      className="App"
      sx={{
        height: '100%',
        width: '100%'
      }}
    >
      {isLoading ? (
        <Typography color="red">LOADING</Typography>
      ) : (
        <>
          {(isLoggedIn || isGuest) && <AppMenu />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="song">
              <Route path=":songId" element={<SongPage />} />
            </Route>
          </Routes>
        </>
      )}
    </Box>
  );
}

export default App;
