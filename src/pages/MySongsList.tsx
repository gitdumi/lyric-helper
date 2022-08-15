import * as React from "react";
import {getNewKey} from "../utils/utils";
import {generateNewEntity, NEW_SONG, SAMPLE_SONGS} from "../context/InitData";
import {useEffect, useRef, useState} from "react";
import {SongData} from "../utils/interfaces";
import {
    Button,
    List,
    ListItemButton,
    Tooltip,
    Typography
} from "@mui/material";
import {LS_KEYS} from "../utils/constants";

function MySongsList() {
    //@ts-ignore
    const [songs, setSongs] = useState<SongData[]>(JSON.parse(localStorage.getItem(LS_KEYS.SONGS)) || SAMPLE_SONGS)
    const [currentSongId, setCurrentSongId] = useState(localStorage.getItem(LS_KEYS.CURRENT) || '0')

    const titleElement = useRef();

    useEffect(() => {
        localStorage.setItem(LS_KEYS.CURRENT, currentSongId)
    }, [currentSongId]);


    useEffect(() => {
        localStorage.setItem("SONGS", JSON.stringify(songs));
    }, [songs]);


    function handleAddSong(e: any) {
        e.stopPropagation();
        setSongs(prev => [...prev, generateNewEntity(NEW_SONG)]);
    }

    const songLinks = songs.map(song => {
        return <Tooltip ref={titleElement} title={song.title} disableHoverListener={song.title.length < 20}>
            <ListItemButton selected={song.id === currentSongId}
                            key={`link-${getNewKey()}`}
                            href={`/song/${song.id}`}
                            onClick={() => setCurrentSongId(song.id)}>
                <Typography noWrap>
                    {song.title}
                </Typography>
            </ListItemButton>
        </Tooltip>
    })

    return (
        <List sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 0,
        }}>
            <Button variant="contained"
                    onClick={handleAddSong}
                // sx={{position: 'sticky',  zIndex: 1}}
            >Add song</Button>
            {songLinks}
        </List>
    )
}

export default MySongsList;