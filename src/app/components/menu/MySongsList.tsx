import * as React from 'react';
import { getNewKey } from '../../../utils/utils';
import { useEffect } from 'react';
import { Button, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSong,
  selectSongs,
  selectCurrentSongId,
  setCurrentSongId,
  signOut,
  selectMain,
  signIn,
  setLoading
} from '../../mainSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RESPONSIVE_WIDTH } from '../../../utils/constants';
import { googleSignOut, signInWithGoogle } from '../../../service/firebaseConfig';

// @ts-ignore
function MySongsList({ setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectMain);
  const songs = useSelector(selectSongs);
  const songId = useSelector(selectCurrentSongId);
  const isResponsive = useMediaQuery(`(max-width: ${RESPONSIVE_WIDTH})`);

  useEffect(() => {
    if (songs.length > 0 && songs.findIndex((song) => song.id === songId) != -1) {
      navigate(`song/${songId}`, { replace: false });
    }
  }, [songId]);

  function handleSignInClick() {
    dispatch(setLoading(true));
    signInWithGoogle().then((result) => {
      dispatch(signIn(result.user?.uid));
      dispatch(setLoading(false));
      navigate('/');
    });
  }

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
          if (isResponsive) {
            setOpen(false);
          }
        }}
      >
        Add song
      </Button>
      {songLinks}
      {isLoggedIn ? (
        <Button
          sx={{
            mt: 'auto'
          }}
          variant="text"
          onClick={() => {
            googleSignOut().then(() => {
              dispatch(signOut());
            });
            if (isResponsive) {
              setOpen(false);
            }
          }}
        >
          Sign out
        </Button>
      ) : (
        <Button
          sx={{
            mt: 'auto'
          }}
          variant="text"
          onClick={handleSignInClick}
        >
          Sign In
        </Button>
      )}
    </List>
  );
}

export default MySongsList;
