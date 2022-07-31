import { useEffect, useState, useRef } from "react";
import { getLyric, getSyllableCount } from "../utils/hipster.ts";
import { moveIconSvg, deleteIconSvg, diceIconSvg } from "../assets/svg/svg";

export default function SectionLyric(props: {
  value: string;
  removeLyric: Function;
  index: number;
  setInputvalue: Function;
}) {
  const { value, removeLyric, index, setInputvalue } = props;

  const randomButton = useRef();
  const inputField = useRef();

  async function handleRandom() {
    console.log("random");
    randomButton.current.disabled = true;
    inputField.current.value = "loading...";
    const result = await getLyric();
    console.log(result.lyric);
    setInputvalue(index, result.lyric);
    //@ts-ignore
    randomButton.current.disabled = false;
  }

  const lyricStyle = {
    width: `${value.length / 2.5}rem`,
  };

  return (
    <div className="section-lyric">
      <button
        className="section-lyric--actions__random svg-button"
        id="random-lyric-button"
        onClick={async (e) => {
          await handleRandom();
          e.stopPropagation();
        }}
        ref={randomButton}
      >
        {diceIconSvg}
      </button>
      <input
        type="text"
        value={value}
        ref={inputField}
        onChange={(e) => setInputvalue(index, e.target.value)}
        style={lyricStyle}
        // maxlength="10"
      ></input>
      <div className="section-lyric--actions">
        <div className="section-lyric--actions__drag svg-button">
          {moveIconSvg}
        </div>
        {/* <button>Duplicate</button> */}
        <button
          className="section-lyric--actions__delete svg-button"
          onClick={(e) => {
            console.log(e.target);
            removeLyric(e, index);
            e.stopPropagation();
          }}
        >
          {deleteIconSvg}
        </button>
      </div>
    </div>
  );
}
