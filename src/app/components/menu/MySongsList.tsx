import * as React from 'react';
import { getNewKey } from '../../../utils/utils';
import { useEffect } from 'react';
import { Button, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSong, selectSongs, selectCurrentSongId, setCurrentSongId } from '../../mainSlice';
import { selectCurrentSong } from '../song/currentSongSlice';

function MySongsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const songs = useSelector(selectSongs);
  const songId = useSelector(selectCurrentSongId);

  useEffect(() => {
    console.log('songs', { songs });
    console.log(songId);
    //Navigating to the newly selected song
    if (songs.length > 0) {
      navigate(`song/${songId}`, { replace: false });
    }
  }, [songId]);

  useEffect(() => {
    //Updating the current selected song to the newly added one
    if (songs.length > 0) {
      dispatch(setCurrentSongId(songs[songs.length - 1].id));
    }
  }, [songs]);

  const songLinks = songs.map((song) => {
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
        onClick={() => {
          dispatch(addSong());
          dispatch(setCurrentSongId(songId));
        }}
      >
        Add song
      </Button>
      {songLinks}
    </List>
  );
}

export default MySongsList;
