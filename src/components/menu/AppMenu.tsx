import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import LyricsSharpIcon from '@mui/icons-material/LyricsSharp';
import MySongsList from './MySongsList';
import { theme } from '../../lib/Theme';

const drawerWidth = '240px';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden',
  borderColor: theme.palette.primary.main
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  },
  borderColor: theme.palette.primary.main
});

const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme: drawerTheme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    padding: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
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

export default function AppMenu() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <CustomDrawer
      variant="permanent"
      open={open}
      onMouseEnter={handleDrawerOpen}
      onMouseOver={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
    >
      {/*<ListItem key={'modal-title'}*/}
      {/*          sx={{bgcolor: theme.palette.background.paper, borderBottom: 'solid 1px', borderColor: theme.palette.primary.main,padding: '0.6rem 0', position: 'fixed', zIndex: 2, userSelect: 'none' }}>*/}
      {/*    <ListItemIcon*/}
      {/*        sx={{*/}
      {/*            minWidth: 0,*/}
      {/*            ml: 2.5,*/}
      {/*            justifyContent: 'left',*/}
      {/*            color: theme.palette.primary.main,*/}
      {/*        }}*/}
      {/*    ><LyricsSharpIcon/>*/}
      {/*    </ListItemIcon>*/}
      {/*    <Typography variant="h6"*/}
      {/*                sx={{visibility: open ? 'visible' : 'hidden', pl: 1, pr: 2, color: theme.palette.primary.main}}> Lyric*/}
      {/*        Helper</Typography>*/}
      {/*</ListItem>*/}
      {/*<List disablePadding>*/}
      {/*<Divider sx={{borderColor: `${open ? theme.palette.primary.main : 'transparent'}`}}/>*/}

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
      {open && <MySongsList />}
    </CustomDrawer>
  );
}
