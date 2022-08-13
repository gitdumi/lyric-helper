import * as React from 'react';
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LyricsSharpIcon from '@mui/icons-material/LyricsSharp';
import Divider from '@mui/material/Divider';
import MySongsList from "../pages/MySongsList";
import {Typography} from "@mui/material";
import {theme} from "../lib/Theme";

const drawerWidth = 'fit-content';
const maxWidth = '500px';

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    borderColor: theme.palette.primary.main,
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    borderColor: theme.palette.primary.main,
});

const CustomDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme: drawerTheme, open}) => ({
        width: drawerWidth,
        maxWidth: maxWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(drawerTheme),
            '& .MuiDrawer-paper': openedMixin(drawerTheme),
        }),
        ...(!open && {
            ...closedMixin(drawerTheme),
            '& .MuiDrawer-paper': closedMixin(drawerTheme),
        }),
    }),
);

export default function SongsModal() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex', m: 0, p: 0}}>
            <CustomDrawer variant="permanent" open={open}
                          onMouseEnter={handleDrawerOpen}
                          onMouseOver={handleDrawerOpen}
                          onMouseLeave={handleDrawerClose}
            >
                <List disablePadding>
                    <ListItem key={'modal-title'} disablePadding sx={{display: 'flex', width: 'fit-content', padding: '0.6rem 0'}}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    ml: 2.5,
                                    justifyContent: 'left',
                                    color: theme.palette.primary.main
                                }}
                            ><LyricsSharpIcon/>
                            </ListItemIcon>
                        <Typography variant="h6" sx={{opacity: open ? 1 : 0, pl: 2, pr: 2, color: theme.palette.primary.main}}> Lyric Helper</Typography>
                    </ListItem>
                    <Divider sx={{borderColor: `${open ? theme.palette.primary.main: 'transparent'}`}}/>
                    {open && <MySongsList/>}
                </List>
            </CustomDrawer>
        </Box>
    );
}