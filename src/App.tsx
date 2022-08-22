import './App.css';
import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SongPage from './app/components/song/SongPage';
import AppMenu from './app/components/menu/AppMenu';
import { Box } from '@mui/material';
import LandingPage from './app/components/LandingPage';

function App() {
  return (
    <Box
      display="flex"
      className="App"
      sx={{
        height: '100%',
        width: '100%'
      }}
    >
      <AppMenu />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="song">
          <Route path=":songId" element={<SongPage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
