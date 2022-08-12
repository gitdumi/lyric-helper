import SongContent from "../components/song/SongContent";
import {SongContextProvider} from "../context/SongContext";
import * as React from "react";
import {useParams} from "react-router-dom";

function SongPage() {
    const {songId} = useParams()

    console.log(songId, 'songId')


    return (
        <SongContextProvider>
            <SongContent/>
        </SongContextProvider>
    )
}

export default SongPage;