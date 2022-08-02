import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import SectionCard from "./components/SectionCard";
import { AppContextProvider, useAppData } from "../src/AppContext";

const SectionCards = () => {
  const { appData } = useAppData();

  console.log(appData);

  return appData.sections.map((section, index) => {
    return (
      <SectionCard
        key={`SC${index}`}
        sectionIndex={index}
        // addLyric={addLyric}
        // removeLyric={removeLyric}
      />
    );
  });
};

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <SectionCards />
      </AppContextProvider>
    </div>
  );
}

export default App;
