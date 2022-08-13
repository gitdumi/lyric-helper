import * as React from "react";
import {getNewKey} from "../utils/utils";
import {generateNewEntity, NEW_SONG, SAMPLE_SONGS} from "../context/InitData";
import {useEffect, useState} from "react";
import {SongData} from "../utils/interfaces";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    List,
    ListItemButton,
    ListItemIcon, ListItemText,
    Paper,
    Typography
} from "@mui/material";
import {LS_KEYS} from "../utils/constants";
import {useNavigate} from "react-router-dom";

function MySongsList() {
    //@ts-ignore
    const [songs, setSongs] = useState<SongData[]>(JSON.parse(localStorage.getItem(LS_KEYS.SONGS)) || SAMPLE_SONGS)
    const [currentSongId, setCurrentSongId] = useState(localStorage.getItem(LS_KEYS.CURRENT) || '0')

    useEffect(() => {
        localStorage.setItem(LS_KEYS.CURRENT, currentSongId)
    }, [currentSongId]);


    useEffect(() => {
        localStorage.setItem("SONGS", JSON.stringify(songs));
    }, [songs]);


    function handleAddSong() {
        setSongs(prev => [...prev, generateNewEntity(NEW_SONG)]);
    }

    const songLinks = songs.map(song => {
        return <ListItemButton selected={song.id === currentSongId} key={`link-${getNewKey()}`}
                               href={`/song/${song.id}`}
                               onClick={() => setCurrentSongId(song.id)}>{song.title}</ListItemButton>
    })

    return (
        <Box sx={{
            bgcolor: 'background.paper', display: 'flex',
            overflow: 'scroll',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <Button variant="contained"
                    onClick={handleAddSong}
                    sx={{mt: '1rem', mb: '1rem'}}
            >Add song</Button>
            <Box
                sx={{
                    display: 'flex',
                    '& > *': {
                        w: '100%',
                    },
                }}
            >
                <List component="nav" aria-label="main mailbox folders">
                    {songLinks}
                </List>
            </Box>
        </Box>
    )
}

export default MySongsList;