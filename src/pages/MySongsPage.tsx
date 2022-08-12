import {Link} from "react-router-dom";
import * as React from "react";
import {getNewKey} from "../utils/utils";
import {generateNewEntity, NEW_SONG, SAMPLE_SONGS} from "../context/InitData";
import {useState} from "react";


function MySongsPage() {
    const [songs, setSongs] = useState(SAMPLE_SONGS);

    function handleAddSong() {
        console.error('Implement add song')
        // setSongs(prev => [...prev, generateNewEntity(NEW_SONG)]);
    }

    const songLinks = songs.map(song => {
        return <Link key={`link-${getNewKey()}`} to={`/song/${song.id}`}>Song {song.id}<br/></Link>
    })

    return (
        <div>
            <h1>My Songs</h1>
            <button onClick={handleAddSong}>Add song</button>
            <ul>
                {songLinks}
            </ul>
        </div>
    )
}

export default MySongsPage;