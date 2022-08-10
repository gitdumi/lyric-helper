import "./App.css";
import {AppContextProvider, useAppData} from "../src/AppContext";
import SongContent from "./components/SongContent";

function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <SongContent/>
            </AppContextProvider>
        </div>
    );
}

export default App;
