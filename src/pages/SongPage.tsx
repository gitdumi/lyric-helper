import SongContent from "../components/song/SongContent";
import {SongContextProvider} from "../context/SongContext";
import * as React from "react";
import {useParams} from "react-router-dom";
import {SAMPLE_SONGS} from "../context/InitData";

function SongPage() {
    const {songId} = useParams();

    console.log('songId', songId)

    return (
        <SongContextProvider>
            <SongContent key={songId} songData={SAMPLE_SONGS.filter(song => song.id === songId)[0]}/>
        </SongContextProvider>
    )
}

export default SongPage;