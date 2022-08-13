import * as React from "react";
import {getNewKey} from "../utils/utils";
import {generateNewEntity, NEW_SONG, SAMPLE_SONGS} from "../context/InitData";
import {useState} from "react";
import {SongData} from "../utils/interfaces";
import {Box, Button, ButtonGroup, Container, Paper, Typography} from "@mui/material";


function MySongsPage() {
    //@ts-ignore
    const [songs, setSongs] = useState<SongData[]>(() => JSON.parse(localStorage.getItem('SONGS')) || SAMPLE_SONGS)


    React.useEffect(() => {
        localStorage.setItem("SONGS", JSON.stringify(songs));
    }, [songs]);

    function handleAddSong() {
        setSongs(prev => [...prev, generateNewEntity(NEW_SONG)]);
    }

    function handleRenameSong(event: any, songId: string) {
        setSongs((prev: SongData[]) => {
            const index = prev.findIndex(song => song.id === songId);
            prev[index].title = event.target.value
            return [...prev]
        })
    }

    const songLinks = songs.map(song => {
        return <Button variant="outlined" key={`link-${getNewKey()}`}
                       href={`/song/${song.id}`}>{song.title}</Button>
    })

    return (
        <Container fixed>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography sx={{mt: 4, mb: 2}} variant="h4" component="div">
                    My Songs
                </Typography>
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

export default MySongsPage;