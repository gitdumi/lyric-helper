import React, { useEffect, useRef, useState } from 'react';
import { getLyric } from '../../../../lib/hipster';
import { AiOutlineCloseCircle, IoColorWandOutline } from 'react-icons/all';
import { ANIMATION_TIMEOUT, MAX_CHARS } from '../../../../utils/constants';
import './SectionLyric.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSectionLyric, selectCurrentSong, updateSectionLyric } from '../currentSongSlice';
import { Tooltip } from '@mui/material';
import CustomInput from '../../misc/InputAutosize/CustomInput';
import { theme } from '../../../../lib/Theme';

export default function SectionLyric(props: {
  index: number;
  sectionIndex: number;
  value: string;
  provided: any;
  setIsLoading: any;
}) {
  const songData = useSelector(selectCurrentSong);
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const { index, sectionIndex, provided, setIsLoading } = props;
  const { value } = songData.sections[sectionIndex].lyrics[index];

  function getVisibility(): any {
    return { visibility: isHover ? 'visible' : 'hidden' };
  }

  function handleChange(event: { target: { value: string } }) {
    console.log(`change section ${sectionIndex} lyric ${index}`);
    dispatch(
      updateSectionLyric({
        sectionIndex: sectionIndex,
        lyricIndex: index,
        value: event.target.value
      })
    );
  }

  async function handleRandom() {
    setIsLoading((prev: any) => !prev);
    const result = await getLyric(songData.config.selectedSylCount);
    dispatch(
      updateSectionLyric({ sectionIndex: sectionIndex, lyricIndex: index, value: result.value })
    );
    setIsLoading((prev: any) => !prev);
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    const container = event.currentTarget.closest('.section-lyric');
    //@ts-ignore
    container.style.transition = `all ${ANIMATION_TIMEOUT}ms`;
    //@ts-ignore
    container.style.opacity = '0';

    setTimeout(function () {
      dispatch(deleteSectionLyric({ sectionIndex: sectionIndex, lyricIndex: index }));
    }, ANIMATION_TIMEOUT / 3);
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
      >
        <IoColorWandOutline className="react-button" style={getVisibility()} />
      </button>

      <CustomInput
        style={{ color: theme.palette.text.primary }}
        value={value}
        handleChange={handleChange}
        max={MAX_CHARS}
      />

      <div className={`section-lyric--actions`}>
        <Tooltip placement="top" title="delete lyric">
          <button
            className="section-lyric--actions__delete svg-wrapper"
            onClick={(e) => {
              handleDelete(e, index);
              e.stopPropagation();
            }}
          >
            <AiOutlineCloseCircle className="react-button" style={getVisibility()} />
          </button>
        </Tooltip>
      </div>
    </li>
  );
}
