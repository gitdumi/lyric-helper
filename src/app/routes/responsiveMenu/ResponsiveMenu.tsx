import * as React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import guestImage from '../../../../public/assets/guest.png';
import './ResponsiveMenu.css';
import useUser from '../../hooks/userHook';
import { theme } from '../../../lib/Theme';
import MySongsList from '../../components/mySongsList';
import { RESPONSIVE_WIDTH } from '../../../utils/constants';

function ResponsiveMenu() {
  const user = useUser();
  const isResponsive = useMediaQuery(`(max-width: ${RESPONSIVE_WIDTH})`);

  console.log(isResponsive);

  return (
    <Box className="responsive-menu">
      <Box display="flex" className="menu-user">
        <img
          className="user-image"
          src={`${user?.photoURL || guestImage}`}
          referrerPolicy="no-referrer"
        />
        <Typography variant="body2" color={theme.palette.primary.main}>
          {user != null ? user?.displayName : 'Guest'}
        </Typography>
      </Box>
      <MySongsList />
    </Box>
  );
}

export default ResponsiveMenu;
