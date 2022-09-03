import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import SectionLyric from '../sectionLyric';
import { Lyric } from '../../../store/utils/interfaces';
import { getLyric } from '../../../../lib/hipster';
import { reorder } from '../../../../utils/utils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { MAX_CHARS, RESPONSIVE_WIDTH } from '../../../../utils/constants';
import { GithubPicker } from 'react-color';
import './SectionCard.css';
import { SECTION_COLORS, theme } from '../../../../lib/Theme';
import {
  addSectionLyric,
  reorderSectionLyrics,
  selectCurrentSong,
  updateSectionColor,
  updateSectionTitle
} from '../../../store/currentSongSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Tooltip, useMediaQuery } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import CustomInput from '../../misc/customInput';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function SectionCard(props: {
  sectionId: string;
  sectionIndex: number;
  handleDuplicate: (sectionIndex: number) => void;
  handleDelete: (event: any, sectionId: string) => void;
  provided: any;
}) {
  const dispatch = useDispatch();
  const songData = useSelector(selectCurrentSong);
  const { sectionIndex, handleDuplicate, handleDelete, sectionId, provided } = props;
  const sectionData = songData.sections[sectionIndex];
  const { lyrics } = sectionData;
  const isResponsive = useMediaQuery(`(max-width: ${RESPONSIVE_WIDTH})`);
  const [isHover, setIsHover] = useState(isResponsive);
  const [isHoverColorPicker, setIsHoverColorPicker] = useState(isResponsive);
  const [isLoading, setIsLoading] = useState(false);

  const addButton = useRef() as LegacyRef<HTMLButtonElement>;

  useEffect(() => {
    setIsHover(isResponsive);
  }, [isResponsive]);

  function getVisibility(): any {
    return { visibility: `${isHover || isHoverColorPicker ? 'visible' : 'hidden'}` };
  }

  function handleChange(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
    target: { value: string };
  }) {
    dispatch(updateSectionTitle({ index: sectionIndex, value: e.target.value }));
  }

  function handleColorChange(color: { hex: string }) {
    dispatch(updateSectionColor({ index: sectionIndex, color: color.hex }));
    setIsHoverColorPicker(false);
  }

  async function addRandomLyric() {
    setIsLoading(true);
    const result = await getLyric(songData.config.selectedSylCount);
    dispatch(addSectionLyric({ sectionIndex: sectionIndex, value: result }));
    setIsLoading(false);
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const newLyrics = reorder(
      songData.sections[sectionIndex].lyrics,
      result.source.index,
      result.destination.index
    );

    dispatch(reorderSectionLyrics({ sectionIndex: sectionIndex, lyrics: newLyrics }));
  }

  const hoverHandler = {
    onHover: () => {
      if (!isResponsive) {
        setIsHover(true);
      }
    },
    onLeave: () => {
      if (!isResponsive) {
        // setIsHover(false);
      }
    }
  };

  const lyricElements = lyrics.map((lyric: Lyric, index: number) => {
    return (
      <Draggable key={`draggable-${lyric.id}`} draggableId={`SL-DRAG-${lyric.id}`} index={index}>
        {(provided) => {
          return (
            <div ref={provided.innerRef} className="draggable-lyric" {...provided.draggableProps}>
              <SectionLyric
                provided={{ ...provided }}
                key={`SL-${lyric.id}`}
                sectionIndex={sectionIndex}
                index={index}
                value={lyric.value}
                setIsLoading={setIsLoading}
              />
            </div>
          );
        }}
      </Draggable>
    );
  });

  return (
    <div
      className="section-card section-width"
      style={{
        backgroundColor: sectionData.color,
        borderLeft: 'solid 2px ' + sectionData.color,
        borderRight: 'solid 2px ' + sectionData.color,
        boxShadow: '5px 5px 0 ' + sectionData.color,
        maxWidth: isResponsive ? '320px' : '40rem'
      }}
    >
      <div>
        {isLoading ? (
          <Stack
            sx={{ width: '100%', color: theme.palette.background.paper, m: 0, p: 0 }}
            spacing={0}
          >
            <LinearProgress variant="indeterminate" color="inherit" sx={{ height: '2px' }} />
          </Stack>
        ) : (
          <Box height={'2px'} color={theme.palette.background.paper} />
        )}
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className="section-card--title"
          onMouseEnter={hoverHandler.onHover}
          onMouseOver={hoverHandler.onHover}
          onMouseLeave={hoverHandler.onLeave}
        >
          <div className="section-card--title__left">
            <CustomInput
              style={{ color: sectionData.color, font: 'inherit' }}
              value={sectionData.name}
              handleChange={handleChange}
              max={MAX_CHARS / 3}
            />
            {!isLoading && (
              <Tooltip placement="top" title="add lyric">
                <button
                  ref={addButton}
                  className="section-card--content__add svg-wrapper react-button "
                  onClick={async () => {
                    await addRandomLyric();
                  }}
                >
                  <ControlPointIcon style={{ ...getVisibility(), color: sectionData.color }} />
                </button>
              </Tooltip>
            )}
          </div>

          <div className="section-card--actions">
            {!isLoading && (
              <>
                <Tooltip placement="top" title="delete section">
                  <button
                    className="section-card--content__delete react-button svg-wrapper"
                    onClick={(event) => {
                      handleDelete(event, sectionId);
                    }}
                  >
                    <HighlightOffSharpIcon
                      style={{ ...getVisibility(), color: sectionData.color }}
                    />
                  </button>
                </Tooltip>
                <Tooltip placement="top" title="duplicate section">
                  <button
                    className="section-duplicate svg-wrapper react-button "
                    onClick={() => handleDuplicate(sectionIndex)}
                  >
                    <ControlPointDuplicateIcon
                      className="sync"
                      style={{
                        ...getVisibility(),
                        color: sectionData.color
                      }}
                    />
                  </button>
                </Tooltip>
              </>
            )}
            <div
              className="section-card--actions__color-picker"
              color={sectionData.color}
              style={{ visibility: getVisibility() }}
            >
              <FiberManualRecordIcon
                fontSize={'inherit'}
                style={{ ...getVisibility(), color: sectionData.color }}
              />
              <GithubPicker
                className="color-picker"
                width="125px"
                triangle={'top-right'}
                colors={SECTION_COLORS}
                onChangeComplete={handleColorChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section-card--content">
        <div className="section-card--content__lyrics" style={{ backgroundColor: 'transparent' }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => {
                return (
                  <div
                    className="droppableLyric"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <ul>{lyricElements}</ul>
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
