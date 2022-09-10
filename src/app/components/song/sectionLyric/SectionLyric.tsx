import React, { useEffect, useState } from 'react';
import { MAX_CHARS, RESPONSIVE_WIDTH } from '../../../../utils/constants';
import './SectionLyric.css';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSectionLyric,
  selectCurrentSong,
  updateSectionLyric
} from '../../../store/currentSongSlice';
import { Tooltip, useMediaQuery } from '@mui/material';
import CustomInput from '../../misc/customInput';
import { theme } from '../../../../lib/Theme';
import convertToUiLyric from '../../../../service/lyric-db/dbLyricAdapter';
import useLyricDb from '../../../hooks/dbHook';

export default function SectionLyric(props: {
  index: number;
  sectionIndex: number;
  value: string;
  provided: any;
  setIsLoading: any;
}) {
  const songData = useSelector(selectCurrentSong);
  const dispatch = useDispatch();
  const isResponsive = useMediaQuery(`(max-width: ${RESPONSIVE_WIDTH})`);
  const { db } = useLyricDb();
  const [isHover, setIsHover] = useState(isResponsive);
  const { index, sectionIndex, provided, setIsLoading } = props;
  const { value } = songData.sections[sectionIndex].lyrics[index];

  useEffect(() => {
    setIsHover(isResponsive);
  }, [isResponsive]);

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
    setIsLoading(true);
    const result = convertToUiLyric(db.lyrics[Math.floor(Math.random() * db.lyrics.length - 1)]);
    dispatch(
      updateSectionLyric({ sectionIndex: sectionIndex, lyricIndex: index, value: result.value })
    );
    setIsLoading(false);
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    dispatch(deleteSectionLyric({ sectionIndex: sectionIndex, lyricIndex: index }));
  };

  const hoverHandler = {
    onHover: () => {
      if (!isResponsive) {
        setIsHover(true);
      }
    },
    onLeave: () => {
      if (!isResponsive) {
        setIsHover(false);
      }
    }
  };

  return (
    <li
      {...provided.dragHandleProps}
      className="section-lyric"
      onMouseEnter={hoverHandler.onHover}
      onMouseOver={hoverHandler.onHover}
      onMouseLeave={hoverHandler.onLeave}
    >
      <Tooltip placement="top" title="randomize">
        <button
          className="svg-wrapper react-button section-lyric--actions__random "
          onClick={async () => {
            await handleRandom();
          }}
        >
          <AutoFixHighIcon
            fontSize="inherit"
            className="wand"
            style={{ visibility: isHover ? 'visible' : 'hidden', color: 'inherit' }}
          />
        </button>
      </Tooltip>
      <CustomInput
        style={{ color: theme.palette.text.primary }}
        value={value}
        handleChange={handleChange}
        max={MAX_CHARS}
      />

      <div className={`section-lyric--actions`}>
        <Tooltip placement="top" title="delete lyric">
          <button
            className="section-lyric--actions__delete svg-wrapper react-button"
            onClick={(e) => {
              handleDelete(e, index);
              e.stopPropagation();
            }}
          >
            <HighlightOffIcon
              fontSize="inherit"
              style={{ visibility: isHover ? 'visible' : 'hidden', color: 'inherit' }}
            />
          </button>
        </Tooltip>
      </div>
    </li>
  );
}
