import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import LyricsSharpIcon from '@mui/icons-material/LyricsSharp';
import MySongsList from '../mySongsList';
import { theme } from '../../../lib/Theme';
import { Box, ClickAwayListener, Typography } from '@mui/material';
import guestImage from '../../../../public/assets/guest.png';
import useUser from '../../hooks/userHook';
import './AppMenu.css';

const drawerWidth = '240px';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  height: '100%',
  overflowX: 'hidden',
  borderColor: theme.palette.primary.main
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  },
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: theme.palette.primary.main
});

const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme: drawerTheme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    padding: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    alignItems: 'center',
    ...(open && {
      ...openedMixin(drawerTheme),
      '& .MuiDrawer-paper': openedMixin(drawerTheme)
    }),
    ...(!open && {
      ...closedMixin(drawerTheme),
      '& .MuiDrawer-paper': closedMixin(drawerTheme)
    })
  })
);

function AppMenu() {
  const [open, setOpen] = React.useState(false);
  const user = useUser();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <CustomDrawer
        className="menu"
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseOver={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        {!open && (
          <ListItemIcon
            sx={{
              minWidth: 0,
              m: 2.5,
              justifyContent: 'left',
              color: theme.palette.primary.main
            }}
          >
            <LyricsSharpIcon />
          </ListItemIcon>
        )}
        {open && (
          <>
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
          </>
        )}
      </CustomDrawer>
    </ClickAwayListener>
  );
}

export default AppMenu;
