import { useEffect, useState, useRef } from "react";
import { getLyric } from "../utils/hipster.ts";

export default function SectionLyric(props: {
  value: string;
  removeLyric: Function;
  index: number;
  setInputvalue: Function;
}) {
  const { value, removeLyric, index, setInputvalue } = props;

  const randomButton = useRef(null)

  async function handleRandom() {
    console.log("random");
    //@ts-ignore
    randomButton.current.disabled = true
    const result = await getLyric();
    console.log(result.lyric);
    setInputvalue(index, result.lyric);
    //@ts-ignore
    randomButton.current.disabled = false
  }

  return (
    <div className="section-lyric">
      <button
        onClick={async (e) => {
          await handleRandom();
          e.stopPropagation();
        }}
        ref={randomButton}
      >
        random
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setInputvalue(index, e.target.value)}
      ></input>

      <div className="section-lyric--drag">
        <span>move</span>
        {/* move */}
      </div>

      <button>Duplicate</button>
      <button
        onClick={(e) => {
          console.log(e.target);
          removeLyric(e, index);
          e.stopPropagation();
        }}
      >
        Delete
      </button>
    </div>
  );
}
