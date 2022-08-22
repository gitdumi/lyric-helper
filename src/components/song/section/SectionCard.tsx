import React, { LegacyRef, useRef, useState } from 'react';
import SectionLyric from './SectionLyric';
import { Lyric } from '../../../app/interfaces';
import { getLyric } from '../../../lib/hipster';
import { reorder } from '../../../utils/utils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  AiOutlineCloseCircle,
  AiOutlinePlusCircle,
  IoSyncCircleOutline,
  GoPrimitiveDot
} from 'react-icons/all';
import { MAX_CHARS } from '../../../utils/constants';
import { GithubPicker } from 'react-color';
import './SectionCard.css';
import { SECTION_COLORS } from '../../../lib/Theme';
import {
  addSectionLyric,
  reorderSectionLyrics,
  selectSong,
  updateSectionColor,
  updateSectionTitle
} from '../songSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SectionCard(props: {
  sectionId: string;
  sectionIndex: number;
  handleDuplicate: (sectionIndex: number) => void;
  handleDelete: (event: any, sectionId: string) => void;
  provided: any;
}) {
  const dispatch = useDispatch();
  const songData = useSelector(selectSong);
  const { sectionIndex, handleDuplicate, handleDelete, sectionId, provided } = props;
  const sectionData = songData.sections[sectionIndex];
  const { lyrics } = sectionData;
  const [isHover, setIsHover] = useState(false);
  const [isHoverColorPicker, setIsHoverColorPicker] = useState(false);

  const addButton = useRef() as LegacyRef<HTMLButtonElement>;

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
    const result = await getLyric(songData.config.selectedSylCount);
    dispatch(addSectionLyric({ sectionIndex: sectionIndex, value: result }));
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
              />
            </div>
          );
        }}
      </Draggable>
    );
  });

  return (
    <div
      className="section-card"
      style={{
        backgroundColor: sectionData.color,
        border: 'solid 2px ' + sectionData.color,
        boxShadow: '5px 5px 0 ' + sectionData.color
      }}
    >
      <div
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className="section-card--title"
        onMouseEnter={() => setIsHover(true)}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="section-card--title__left">
          <input
            type="text"
            placeholder="Section"
            value={sectionData.name}
            // ref={inputField}
            onChange={handleChange}
            minLength={3}
            maxLength={MAX_CHARS / 3}
            style={{
              minWidth: '7ch',
              width: `${sectionData.name.length * 1.1}ch`,
              color: sectionData.color
            }}
          />
          <button
            ref={addButton}
            className="section-card--content__add svg-wrapper"
            onClick={async () => {
              await addRandomLyric();
            }}
          >
            <AiOutlinePlusCircle
              color={sectionData.color}
              style={getVisibility()}
              className="react-button"
            />
          </button>
        </div>

        <div className="section-card--actions">
          <button
            className="section-card--content__delete svg-wrapper"
            onClick={(event) => {
              handleDelete(event, sectionId);
            }}
          >
            <AiOutlineCloseCircle
              className="react-button"
              color={sectionData.color}
              style={getVisibility()}
            />
          </button>
          <button
            className="section-duplicate svg-wrapper"
            onClick={() => handleDuplicate(sectionIndex)}
          >
            <IoSyncCircleOutline
              className="react-button sync"
              color={sectionData.color}
              style={getVisibility()}
            />
          </button>

          {/*<button*/}
          {/*    className="section-card--content__config svg-wrapper"*/}
          {/*    onClick={async (e) => {*/}

          {/*    }}*/}
          {/*>*/}
          {/*    <FiDivideCircle color={sectionData.color} style={getVisibility()}*/}
          {/*                    className="react-button divide"/>*/}
          {/*</button>*/}

          <div
            className="section-card--actions__color-picker"
            color={sectionData.color}
            style={{ visibility: getVisibility() }}
          >
            <GoPrimitiveDot color={sectionData.color} style={{ visibility: getVisibility() }} />
            <GithubPicker
              className="color-picker"
              width="100px"
              triangle={'top-right'}
              colors={SECTION_COLORS}
              onChangeComplete={handleColorChange}
            />
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
