import * as React from 'react';
import { getNewKey } from '../../../utils/utils';
import { useEffect } from 'react';
import { Button, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSong, selectSongs, selectCurrentSongId, setCurrentSongId } from '../../mainSlice';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_WIDTH } from '../../../utils/constants';

// @ts-ignore
function MySongsList({ setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const songs = useSelector(selectSongs);
  const songId = useSelector(selectCurrentSongId);
  const isResponsive = useMediaQuery({ maxWidth: RESPONSIVE_WIDTH });

  useEffect(() => {
    //Navigating to the newly selected song
    if (songs.length > 0) {
      navigate(`song/${songId}`, { replace: false });
    }
  }, [songId]);

  useEffect(() => {
    if (songs.length === 1) {
      dispatch(setCurrentSongId(songs[0].id));
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
            if (isResponsive) {
              setOpen(false);
            }
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
