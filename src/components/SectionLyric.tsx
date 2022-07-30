import { useEffect, useState } from "react";

export default function SectionLyric(props: {
  value: string;
  removeLyric: Function;
  index: number;
  setInputvalue: Function;
}) {
  const { value, removeLyric, index, setInputvalue } = props;

  return (
    <div className="section-lyric">
      <button>random</button>
      <input
        type="text"
        value={value}
        onChange={(e) => setInputvalue(index, e.target.value)}
      ></input>

      <div className="section-lyric--drag">
        <span>move</span>
        move
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
