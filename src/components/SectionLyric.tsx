import { useEffect, useState } from "react";

export default function SectionLyric(props: {
  value: string;
  removeLyric: Function;
  index: number;
}) {
  const { value, removeLyric, index } = props;

  const [inputValue, setInputValue] = useState(value);

  function handleChange(event: any) {
    setInputValue(event.target.value);
  }

  return (
    <div className="section-lyric">
      <button>random</button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleChange(e)}
      ></input>

      <div className="section-lyric--drag">
        <span>move</span>
        move
      </div>

      <button>Duplicate</button>
      <button
        onClick={(e) => {
          console.log(e.target);
          removeLyric(index);
          e.stopPropagation();
        }}
      >
        Delete
      </button>
    </div>
  );
}
