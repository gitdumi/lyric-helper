import * as React from 'react';
import { getNewKey } from '../utils/utils';
import { useEffect, useState } from 'react';
import { Button, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  addSong,
  selectSongs,
  selectCurrentSongId,
  setCurrentSongId
} from '../store/slices/mainSlice';
import { SongState } from '../store/slices/songSlice';

function MySongsList() {
  const dispatch = useDispatch();
  const songs: SongState[] = useSelector(selectSongs);
  const songId: string = useSelector(selectCurrentSongId);
  const navigate = useNavigate();

  useEffect(() => {
    if (songId != '0') {
      navigate(`song/${songId}`, { replace: false });
    }
  }, [songId]);

  const songLinks = songs.map((song: SongState) => {
    return (
      <Tooltip
        key={`tooltip-${getNewKey()}`}
        title={song.title}
        disableHoverListener={song.title.length < 20}
      >
        <ListItemButton
          selected={song.id === songId}
          key={`link-${song.id}`}
          onClick={() => {
            dispatch(setCurrentSongId(song.id));
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
          dispatch(addSong());
        }}
      >
        Add song
      </Button>
      {songLinks}
    </List>
  );
}

export default MySongsList;
