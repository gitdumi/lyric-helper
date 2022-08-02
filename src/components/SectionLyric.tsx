import { useEffect, useState, useRef, useContext, EventHandler } from "react";
import { getLyric, getSyllableCount } from "../utils/hipster.ts";
import { moveIconSvg, deleteIconSvg, diceIconSvg } from "../assets/svg/svg";
import { useInputValue } from "../utils/hooks";
import { AppData } from "../utils/interfaces";
import { useAppData } from "../AppContext";

export default function SectionLyric(props: {
  // value: string;
  // removeLyric: Function;
  index: number;
  sectionIndex: number;
  // setInputvalue: Function;
}) {
  // const { value, removeLyric, index, setInputvalue } = props;

  const {appData, setAppData} = useAppData();
  const { index, sectionIndex } = props;
  const value = appData.sections[sectionIndex].lyrics[index];

  const randomButton = useRef();
  const inputField = useRef();

  function handleChange(e) {
    console.log('here');
    //@ts-ignore
    setAppData((prevAppData: AppData) => {
      prevAppData.sections[sectionIndex].lyrics[index] = e.target.value;
      console.log(prevAppData);
      return {...prevAppData, sections: prevAppData.sections};
    })
  }

  async function handleRandom() {
    console.log("random");
    randomButton.current.disabled = true;
    inputField.current.value = "loading...";
    const result = await getLyric();
    console.log(result.lyric);
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
        onChange={(e) => handleChange(e)}
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
            // removeLyric(e, index);
            e.stopPropagation();
          }}
        >
          {deleteIconSvg}
        </button>
      </div>
    </div>
  );
}
