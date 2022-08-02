import { useContext, useState } from "react";
import SectionLyric from "./SectionLyric";
import { addIconSvg } from "../assets/svg/svg";
import { AppData, SectionData } from "../utils/interfaces";
import { useAppData } from "../AppContext";
import { getLyric } from "../utils/hipster";

export default function SectionCard(props: { sectionIndex: number }) {
  const { appData, setAppData } = useAppData();
  const { sectionIndex } = props;
  const sectionData = appData.sections[sectionIndex];
  const { lyrics, count } = sectionData;

  // const [position, setPosition] = useState({ oldPosition: 0, newPosition: 0 });

  // function getChangedPos(oldPosition: number, newPosition: number) {
  //   console.log("change");
  //   setPosition({ oldPosition: oldPosition, newPosition: newPosition });
  // }

  const addLyric = () => {
    // getLyric(appData.config.selectedSylCount).then((result) => {
    //   console.log("here");
    //   setAppData((prev) => {
    //     //       prevAppData.sections[sectionIndex].lyrics[index] = e.target.value;
    //     // console.log(prevAppData);
    //     // return {...prevAppData, sections: prevAppData.sections};
    //     prev.sections[sectionIndex].lyrics = [
    //       ...sectionData.lyrics,
    //       result.lyric,
    //     ];
    //     return prev;
    //   });
    // });
  };

  const lyricElements = lyrics.map((text: string, index: number) => {
    return (
      <SectionLyric
        key={`SL${index}`}
        sectionIndex={sectionIndex}
        index={index}
        value={text}
        // removeLyric={removeLyric}
      />
    );
  });

  return (
    <div className="section-card">
      <div className="section-card--title">Chorus</div>
      <div className="section-card--content">
        <div className="section-card--content__lyrics">
          <ul>{lyricElements}</ul>
          <button
            className="section-card--content__add svg-button"
            onClick={(e) => {
              addLyric();
              e.stopPropagation();
            }}
          >
            {addIconSvg}
          </button>
        </div>
        <div className="section-card--actions">
          <button>duplicate</button>
          <button>move</button>
          <button>delete</button>
        </div>
      </div>
      <div className="section-duplicate">
        <button>duplicate section</button>
      </div>
    </div>
  );
}
