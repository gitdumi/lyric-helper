import "./App.css";
import SectionCard from "./components/SectionCard";
import {AppContextProvider, useAppData} from "../src/AppContext";
import {SectionData} from "./utils/interfaces";

function SectionCards() {
    const {appData} = useAppData();

    return appData.sections.map((section: SectionData, index: number) => {
        return (
            <SectionCard
                key={`SC${index}`}
                sectionIndex={index}
            />
        );
    });
};

function App() {
    return (
        <div className="App">
            <AppContextProvider>
                <SectionCards/>
            </AppContextProvider>
        </div>
    );
}

export default App;
