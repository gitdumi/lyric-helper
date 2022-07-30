import { useState } from "react";
import SectionLyric from "./SectionLyric";

export default function SectionCard(props: {
  data: { lyrics: [] };
  removeLyric: Function;
  addLyric: Function;
  setInputValue: Function;
}) {
  const { lyrics } = props.data;
  const { addLyric, removeLyric, setInputValue } = props;
  const [position, setPosition] = useState({ oldPosition: 0, newPosition: 0 });

  function getChangedPos(oldPosition: number, newPosition: number) {
    console.log("change");
    setPosition({ oldPosition: oldPosition, newPosition: newPosition });
  }

  const lyricElements = lyrics.map((text: string, index: number) => {
    return (
      <SectionLyric
        key={index}
        index={index}
        value={text}
        removeLyric={removeLyric}
        setInputvalue={setInputValue}
      />
    );
  });

  return (
    <div className="section-card">
      <div className="section-card--title">Chorus</div>
      <div className="section-card--content">
        <div className="section-card--content__lyrics">
          <ul>
            {lyricElements}
            <button
              onClick={(e) => {
                addLyric();
                e.stopPropagation();
              }}
            >
              Add
            </button>
          </ul>
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
