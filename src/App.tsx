import { useEffect, useState } from "react";
import "./App.css";
import SectionCard from "./components/SectionCard";
import { getLyric, getLyricSync } from "./utils/hipster";

interface SectionData {
  lyrics: string[];
  count: number;
}

function App() {
  const [sectionData, setSectionData] = useState({
    lyrics: [],
    count: 0,
  });

  useEffect(() => {
    addLyric();
  }, [])

  function setInputValue(index: number, value: string) {
    const updatedLyrics = [...sectionData.lyrics];
    updatedLyrics[index] = value;

    setSectionData((prev) => ({
      ...prev,
      lyrics: updatedLyrics,
    }));
  }

  function addLyric() {
    getLyric(8).then((result) => {
      setSectionData((prev) => ({
        ...prev,
        lyrics: [...sectionData.lyrics, result.lyric],
      }));
    });
  }

  function removeLyric(event: Event, index: number) {
    event.preventDefault();
    const updatedLyrics = sectionData.lyrics.filter((lyr, i) => {
      console.log(lyr, i);
      return i != index;
    });

    console.log(index + "delete");

    setSectionData((prev: SectionData) => {
      return {
        lyrics: updatedLyrics,
        count: updatedLyrics.length - 1,
      };
    });
  }

  return (
    <div className="App">
      <SectionCard
        data={sectionData}
        addLyric={addLyric}
        removeLyric={removeLyric}
        setInputValue={setInputValue}
      />
    </div>
  );
}

export default App;
