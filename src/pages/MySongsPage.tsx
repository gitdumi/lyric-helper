import {Link} from "react-router-dom";
import * as React from "react";
import {getNewKey} from "../utils/utils";
import {generateNewEntity, NEW_SONG, SAMPLE_SONGS} from "../context/InitData";
import {useState} from "react";
import {SongData} from "../utils/interfaces";


function MySongsPage() {
    //@ts-ignore
    const [songs, setSongs] = useState<SongData[]>(() => JSON.parse(localStorage.getItem('SONGS')) || SAMPLE_SONGS)


    React.useEffect(() => {
        localStorage.setItem("SONGS", JSON.stringify(songs));
    }, [songs]);

    function handleAddSong() {
        setSongs(prev => [...prev, generateNewEntity(NEW_SONG)]);
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