import {Link} from "react-router-dom";
import * as React from "react";


function MySongsPage() {

    const songs = ['1', '2', '3']

    const songLinks = songs.map(id => {
        return <Link to={`/song/${id}`}>Song {id}<br/></Link>
    })


    return (
        <div>
            <h1>My Songs</h1>
            <ul>
                {songLinks}
            </ul>
        </div>
    )
}

export default MySongsPage;