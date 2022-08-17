import * as React from 'react';
import { getNewKey } from '../utils/utils';
import { generateNewEntity, NEW_SONG, SAMPLE_SONGS } from '../context/InitData';
import { useEffect, useState } from 'react';
import { SongData } from '../utils/interfaces';
import { Button, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import { LS_KEYS } from '../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';

function MySongsList() {
  const [songs, setSongs] = useState<SongData[]>(
    JSON.parse(localStorage.getItem(LS_KEYS.SONGS) || '[]') || SAMPLE_SONGS
  );

  const [currentSongId, setCurrentSongId] = useState(localStorage.getItem(LS_KEYS.CURRENT) || '0');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSongs(JSON.parse(localStorage.getItem(LS_KEYS.SONGS) || '[]'));
  }, [location]);

  useEffect(() => {
    localStorage.setItem(LS_KEYS.CURRENT, currentSongId);
    if (currentSongId != '0') {
      navigate(`song/${currentSongId}`, { replace: false });
    }
  }, [currentSongId]);

  useEffect(() => {
    localStorage.setItem('SONGS', JSON.stringify(songs));
  }, [songs]);

  function handleAddSong(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    const newSong = generateNewEntity(NEW_SONG);
    setSongs((prev) => [...prev, newSong]);
    setCurrentSongId(newSong.id);
    return newSong;
  }

  const songLinks = songs.map((song) => {
    return (
      <Tooltip
        key={`tooltip-${getNewKey()}`}
        title={song.title}
        disableHoverListener={song.title.length < 20}
      >
        <ListItemButton
          selected={song.id === currentSongId}
          key={`link-${song.id}`}
          onClick={() => {
            setCurrentSongId(song.id);
          }}
        >
          <Typography noWrap>{song.title}</Typography>
        </ListItemButton>
      </Tooltip>
    );
  });

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 0
      }}
    >
      <Button
        variant="contained"
        onClick={(e) => {
          handleAddSong(e);
          // console.log(songs)
          // console.log(songs.length)
          // console.log(songs[songs.length - 1].id)

          // navigate(`song/${songs[songs.length - 1].id}`)
          // setTimeout(() => {
          //     console.log('after',songs)
          //     navigate(`song/${songs[songs.length - 1].id}`)
          // }, 6000)
        }}
        // sx={{position: 'sticky',  zIndex: 1}}
      >
        Add song
      </Button>
      {songLinks}
    </List>
  );
}

export default MySongsList;
