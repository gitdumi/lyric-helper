import React, { LegacyRef, useRef, useState } from 'react';
import { getLyric } from '../../../utils/hipster';
import { useSongData } from '../../../context/SongContext';
import { AiOutlineCloseCircle, IoColorWandOutline } from 'react-icons/all';
import { ANIMATION_TIMEOUT, MAX_CHARS } from '../../../utils/constants';
import { SongData } from '../../../utils/interfaces';
import './SectionLyric.css';

export default function SectionLyric(props: {
  index: number;
  sectionIndex: number;
  value: string;
  provided: any;
}) {
  const { songData, setSongData } = useSongData();
  const [isHover, setIsHover] = useState(false);
  const { index, sectionIndex, provided } = props;
  const { value, id } = songData.sections[sectionIndex].lyrics[index];

  const randomButton = useRef() as LegacyRef<HTMLButtonElement>;
  const inputField = useRef() as LegacyRef<HTMLInputElement>;

  function getVisibility(): any {
    return { visibility: isHover ? 'visible' : 'hidden' };
  }

  function handleChange(e: { target: { value: any } }) {
    console.log(`change section ${sectionIndex} lyric ${index}`);
    setSongData((prevsongData: SongData) => {
      const newLyrics = [...prevsongData.sections[sectionIndex].lyrics].map((lyr) => {
        if (lyr.id === id) {
          return { id: id, value: e.target.value };
        } else {
          return lyr;
        }
      });

      prevsongData.sections[sectionIndex] = {
        ...prevsongData.sections[sectionIndex],
        lyrics: newLyrics
      };
      const newSections = [...prevsongData.sections];

      return { ...prevsongData, sections: newSections };
    });
  }

  async function handleRandom() {
    //@ts-ignore
    inputField.current.value = 'loading...';
    const result = await getLyric(songData.config.selectedSylCount);
    setSongData((prev: SongData) => {
      prev.sections[sectionIndex].lyrics = prev.sections[sectionIndex].lyrics.map((lyr) => {
        if (lyr.id === id) {
          return result;
        } else {
          return lyr;
        }
      });
      return { ...prev, sections: prev.sections };
    });
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    event.preventDefault();
    const updatedLyrics = songData.sections[sectionIndex].lyrics.filter(
      (lyr: object, i: number) => {
        return i != index;
      }
    );
    const container = event.currentTarget.closest('.section-lyric');
    // @ts-ignore
    container.style.transition = 'all 0.5s';
    // @ts-ignore
    container.style.opacity = '0';
    setTimeout(function () {
      setSongData((prev: SongData) => {
        prev.sections[sectionIndex].lyrics = updatedLyrics;
        return { ...prev, sections: prev.sections };
      });
    }, ANIMATION_TIMEOUT);
  };

  return (
    <li
      {...provided.dragHandleProps}
      className="section-lyric"
      onMouseEnter={() => setIsHover(true)}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button
        className="section-lyric--actions__random svg-wrapper"
        onClick={async () => {
          await handleRandom();
        }}
        ref={randomButton}
      >
        <IoColorWandOutline className="react-button" style={getVisibility()} />
      </button>

      <input
        type="text"
        value={value}
        ref={inputField}
        maxLength={MAX_CHARS}
        onChange={handleChange}
        style={{ width: value.length + 1 + 'ch' }}
      />
      <div className={`section-lyric--actions`}>
        <button
          className="section-lyric--actions__delete svg-wrapper"
          onClick={(e) => {
            handleDelete(e, index);
            e.stopPropagation();
          }}
        >
          <AiOutlineCloseCircle className="react-button" style={getVisibility()} />
        </button>
      </div>
    </li>
  );
}
