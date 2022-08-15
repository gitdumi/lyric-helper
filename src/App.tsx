import "./App.css";
import * as React from "react";
import {Routes, Route} from "react-router-dom";
import SongPage from "./pages/SongPage";
import AppMenu from "./components/AppMenu"
import {Box} from "@mui/material";
import {SongContextProvider} from "./context/SongContext";


function App() {

    return (
        <Box display="flex" className="App"
        sx={{
            height: '100%',
            width: '100%'
        }}>
            <AppMenu/>
            <Routes>
                <Route path="/song/:songId" element={<SongContextProvider><SongPage/></SongContextProvider>}/>
                <Route path="/"/>
                <Route path="*" element={<div>Not found</div>}/>
            </Routes>
        </Box>
    );
}

export default App;
