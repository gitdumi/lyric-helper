import { useEffect, useState } from "react";
import "./App.css";
import SectionCard from "./components/SectionCard";

interface SectionData {
  lyrics: string[];
  count: number;
}

function App() {
  const [sectionData, setSectionData] = useState({
    lyrics: ["Hipster ipsum"],
    count: 0,
  });

  function addLyric() {
    console.log(sectionData);
    setSectionData((prev) => ({
      ...prev,
      lyrics: [...sectionData.lyrics, `New ${sectionData.count}`],
      count: sectionData.count+1,
    }));
  }

  function removeLyric(index: number) {
    const updatedLyrics = sectionData.lyrics.filter((lyr, i) => {
      console.log(lyr, i);
      i != 1;
    });

    console.log(index + "delete");

    setSectionData((prev: SectionData) => ({
      ...prev,
      lyrics: updatedLyrics,
      count: updatedLyrics.length,
    }));
  }

  // function moveLyric(oldIndex: number, newIndex: number) {
  //   let lyrics = [...sectionData.lyrics];
  //   const oldLyric = lyrics[oldIndex];
  //   const newLyric = lyrics[newIndex];

  //   console.log({ lyrics, old: oldLyric });
  //   lyrics[oldIndex] = newLyric;
  //   lyrics[newIndex] = oldLyric;

  //   console.log({ lyrics, new: newLyric });
  // }

  return (
    <div className="App">
      <SectionCard
        data={sectionData}
        addLyric={addLyric}
        removeLyric={removeLyric}
      />
    </div>
  );
}

export default App;
