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

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
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
});

const CustomDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme: drawerTheme, open}) => ({
        width: drawerWidth,
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
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <CustomDrawer variant="permanent" open={open}
                          onMouseEnter={handleDrawerOpen}
                          onMouseOver={handleDrawerOpen}
                          onMouseLeave={handleDrawerClose}
                          sx={{border: 'none'}}
            >
                <List>
                    <ListItem key={'Songs'} disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'left',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'left',
                                }}
                            ><LyricsSharpIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Songs'} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{borderColor: `${open ? '': 'transparent'}`}}/>
                    {open && <MySongsList/>}

                </List>
            </CustomDrawer>
        </Box>
    );
}