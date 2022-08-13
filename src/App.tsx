import "./App.css";
import * as React from "react";
import {Routes, Route} from "react-router-dom";
import MySongsPage from "./pages/MySongsPage";
import SongPage from "./pages/SongPage";
import SongsModal from "./components/SongsModal"


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/song/:songId" element={<SongPage/>}/>
                <Route path="/" element={<MySongsPage/>}/>
                <Route path="/draw" element={<SongsModal/>}/>
            </Routes>
        </div>
    );
}

export default App;
