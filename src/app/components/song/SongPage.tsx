import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlusCircle } from 'react-icons/all';
import { reorder } from '../../../utils/utils';
import { ANIMATION_TIMEOUT, MAX_CHARS, RESPONSIVE_WIDTH } from '../../../utils/constants';
import SectionCard from './section/SectionCard';
import { COLORS, theme } from '../../../lib/Theme';
import './SongPage.css';
import { Box, Button, Paper } from '@mui/material';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSong,
  saveSong,
  selectCurrentSongId,
  selectPickedSong,
  selectSongs
} from '../../mainSlice';
import {
  addSection,
  updateSongTitle,
  selectCurrentSong,
  deleteSection,
  duplicateSection,
  reorderSections,
  setSong
} from './currentSongSlice';
import { SectionState } from '../../interfaces';
import { useMediaQuery } from 'react-responsive';

function SongPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const songs = useSelector(selectSongs);
  const currentSong = useSelector(selectPickedSong);
  const currentSongId = useSelector(selectCurrentSongId);
  const songData = useSelector(selectCurrentSong);
  const isResponsive = useMediaQuery({ maxWidth: RESPONSIVE_WIDTH });

  useEffect(() => {
    //Setting the song in store to the selected one
    //Also, once the song list gets modified, updating the song slice with the newly selected song (fixes navigation after delete)
    if (songs.length > 0) {
      dispatch(setSong(currentSong));
    } else {
      navigate('/');
    }
  }, [songs, location.pathname, currentSongId]);

  function handleDeleteSection(
    event: { stopPropagation: () => void; currentTarget: { closest: (arg0: string) => any } },
    sectionId: string
  ) {
    event.stopPropagation();
    const container = event.currentTarget.closest('.section-card');
    container.style.transition = 'all 0.5s';
    container.style.opacity = '0';
    setTimeout(function () {
      dispatch(deleteSection(sectionId));
    }, ANIMATION_TIMEOUT);
  }

  function onDragEnd(result: { destination: { index: number }; source: { index: number } }) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      songData.sections,
      result.source.index,
      result.destination.index
    ) as SectionState[];
    dispatch(reorderSections(items));
  }

  const sectionComponents = songData.sections.map((section: SectionState, index: number) => (
    <Draggable key={section.id} draggableId={section.id} index={index}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} id="draggable-section">
            <SectionCard
              provided={{ ...provided }}
              key={`SC-${section.id}`}
              sectionIndex={index}
              sectionId={section.id}
              handleDuplicate={() => dispatch(duplicateSection(index))}
              handleDelete={(e) => handleDeleteSection(e, section.id)}
            />
          </div>
        );
      }}
    </Draggable>
  ));

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        overflow: 'auto',
        pl: '5rem',
        pr: '1rem',
        width: 'device-width'
      }}
    >
      <input
        className="song-title"
        type="text"
        placeholder="Song Title"
        value={songData.title}
        onChange={(e) => dispatch(updateSongTitle(e.target.value))}
        maxLength={MAX_CHARS / 2}
        style={{
          minWidth: `${songData.title.length + 1}ch`,
          color: `${songData.sections[0]?.color || COLORS.GREEN}`
        }}
      />
      {/*@ts-ignore*/}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sectionComponents}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <button
          style={{
            marginBottom: '100px',
            marginTop: `${songData.sections.length > 0 ? '0' : '1rem'}`
          }}
          id="add-section"
          onClick={() => {
            dispatch(addSection());
          }}
        >
          <AiOutlinePlusCircle className="react-button" id="addSectionButtonIcon" />
          section
        </button>
      </DragDropContext>
      <Paper
        elevation={3}
        sx={{
          bgcolor: 'background.paper',
          textAlign: 'center',
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Button
          variant="contained"
          sx={{ justifySelf: 'center', m: '1rem', ml: 'auto', transform: 'translateX(48px)' }}
          onClick={() => dispatch(saveSong(songData))}
        >
          Save
        </Button>

        <HighlightOffSharpIcon
          className="svg-wrapper react-button"
          id="deleteSongButtonIcon"
          onClick={() => {
            dispatch(deleteSong(songData));
          }}
          sx={{
            color: theme.palette.error.main,
            justifySelf: 'center',
            mr: '2rem',
            fontSize: 30,
            ml: 'auto',
            cursor: 'pointer'
          }}
        />
      </Paper>
    </Box>
  );
}

export default SongPage;