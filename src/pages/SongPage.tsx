import SongContent from "../components/song/SongContent";
import {SongContextProvider} from "../context/SongContext";
import * as React from "react";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {SongData} from "../utils/interfaces";
import {LS_KEYS} from "../utils/constants";
import "./SongPage.css"

function SongPage() {
    const {songId} = useParams();
    // @ts-ignore
    const [song, setSong] = useState<SongData>(JSON.parse(localStorage.getItem(LS_KEYS.SONGS)).filter((song: SongData) => song.id === songId)[0]);
    console.log('songId', songId)

    return (
        <SongContextProvider>
            <SongContent key={songId} songData={song}/>
        </SongContextProvider>
    )
}

export default SongPage;