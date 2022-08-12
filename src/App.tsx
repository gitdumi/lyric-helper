import "./App.css";
import * as React from "react";
import {Routes, Route} from "react-router-dom";
import MySongsPage from "./pages/MySongsPage";
import SongPage from "./pages/SongPage";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/song/:songId" element={<SongPage/>}/>
                <Route path="/" element={<MySongsPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
