import * as React from "react";
import {getNewKey} from "../utils/utils";
import {generateNewEntity, NEW_SONG, SAMPLE_SONGS} from "../context/InitData";
import {useEffect, useState} from "react";
import {SongData} from "../utils/interfaces";
import {Box, Button, ButtonGroup, Container, Paper, Typography} from "@mui/material";
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
        return <Button variant={ song.id === currentSongId ? "contained" : "outlined"} key={`link-${getNewKey()}`}
                       href={`/song/${song.id}`} onClick={() => setCurrentSongId(song.id)}>{song.title}</Button>
    })

    return (
        <Container fixed>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pt: '1rem'
            }}>

                <Button variant="contained" onClick={handleAddSong}>Add song</Button>
                <Box
                    sx={{
                        display: 'flex',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="contained"
                    >{songLinks}</ButtonGroup>
                </Box>
            </Box>
        </Container>
    )
}

export default MySongsList;