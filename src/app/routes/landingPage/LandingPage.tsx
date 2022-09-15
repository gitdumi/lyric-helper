import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { theme } from '../../../lib/Theme';
import './LandingPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectMain, setGuest, setLoading, signIn } from '../../store/mainSlice';
import { signInWithGoogle } from '../../../service/firebaseConfig';
import guestImage from '../../../../public/assets/guest.png';
import useUser from '../../hooks/userHook';
import * as React from 'react';
import { RESPONSIVE_WIDTH } from '../../../utils/constants';
import LyricsSharpIcon from '@mui/icons-material/LyricsSharp';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const { isLoggedIn, isGuest, isLoading } = useSelector(selectMain);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUser();
  const isResponsive = useMediaQuery(`(max-width: ${RESPONSIVE_WIDTH})`);

  function handleSignInClick() {
    dispatch(setLoading(true));
    signInWithGoogle().then((result) => {
      dispatch(signIn(result.user?.uid));
      dispatch(setLoading(false));
    });
  }

  return (
    <Box
      className="landing-page"
      sx={{
        ml: isLoggedIn || isGuest ? (!isResponsive ? '4rem' : '') : ''
      }}
    >
      <Box
        className="landing-section"
        display="inline"
        sx={{
          flexDirection: 'row'
        }}
      >
        {(isLoggedIn || isGuest) && (
          <div className="landing-section">
            <img
              className="user-image"
              style={{ width: '40px', borderRadius: '50%' }}
              src={`${user?.photoURL || guestImage}`}
              alt=""
            />
            <Typography variant="body2" color={theme.palette.primary.main}>
              {isLoggedIn && user != null ? user?.displayName : 'Guest'}
            </Typography>
          </div>
        )}
      </Box>

      <Typography className="landing-section" variant="h2" color={theme.palette.primary.main}>
        welcome to Lyric Helper!
      </Typography>
      <Typography className="landing-section" variant="h6">
        {isLoggedIn || isGuest ? (
          isResponsive ? (
            <Box className="landing-click-box landing-section">
              {'click'}
              <LyricsSharpIcon
                sx={{
                  m: '0 0.5rem',
                  color: theme.palette.primary.main,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/menu')}
              />
              {'to get started'}
            </Box>
          ) : (
            'hover over the panel to get started'
          )
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
        <Typography className="landing-section" variant="body1" color={theme.palette.primary.main}>
          NOTE: as a guest you can only save songs locally. <br /> If you clear your browser data
          your songs will be lost.
        </Typography>
      )}
    </Box>
  );
}

export default LandingPage;
