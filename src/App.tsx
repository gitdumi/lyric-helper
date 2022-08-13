import "./App.css";
import * as React from "react";
import {Routes, Route} from "react-router-dom";
import SongPage from "./pages/SongPage";
import SongsModal from "./components/SongsModal"
import {Box, Container} from "@mui/material";
import {SongContextProvider} from "./context/SongContext";


function App() {

    return (
        <Box display='flex' className="App">
            <Container fixed sx={{mt: '2rem'}}>
                <SongsModal/>
                <Routes>
                    <Route path="/song/:songId" element={<SongContextProvider><SongPage/></SongContextProvider>}/>
                    <Route path="/"/>
                </Routes>
            </Container>
        </Box>
    );
}

export default App;
