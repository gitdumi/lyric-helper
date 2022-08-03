import "./App.css";
import {AppContextProvider} from "../src/AppContext";
import LyricHelperMain from "./components/LyricHelperMain";

function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <LyricHelperMain/>
            </AppContextProvider>
        </div>
    );
}

export default App;
