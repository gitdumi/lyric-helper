import {Link} from "react-router-dom";
import * as React from "react";
import {getNewKey} from "../utils/utils";


function MySongsPage() {

    const songs = ['1', '2', '3']

    const songLinks = songs.map(id => {
        return <Link key={`link-${getNewKey()}`} to={`/song/${id}`}>Song {id}<br/></Link>
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