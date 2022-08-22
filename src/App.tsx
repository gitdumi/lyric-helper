import './App.css';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import SongPage from './app/components/song/SongPage';
import AppMenu from './app/components/menu/AppMenu';
import { Box } from '@mui/material';

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
        <Route path="/">
          <Route path="song">
            <Route path=":songId" element={<SongPage />} />
          </Route>
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
