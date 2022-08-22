import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlusCircle } from 'react-icons/all';
import { reorder } from '../utils/utils';
import { ANIMATION_TIMEOUT, MAX_CHARS } from '../utils/constants';
import SectionCard from '../components/song/section/SectionCard';
import { COLORS, theme } from '../lib/Theme';
import './SongPage.css';
import { Box, Button, Paper } from '@mui/material';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { deleteSong, saveSong, selectSongById, selectSongs } from '../store/slices/mainSlice';
import {
  addSection,
  updateSongTitle,
  setSong,
  selectSong,
  deleteSection,
  duplicateSection,
  reorderSections
} from '../store/slices/songSlice';
import { SectionState } from '../store/interfaces';

function SongPage() {
  const dispatch = useDispatch();
  const songs = useSelector(selectSongs);
  const songStateCopy = {
    ...useSelector((state: RootState) => selectSongById(state.main, state.main.selected))
  };
  const songData = useSelector(selectSong);
  const { songId } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  console.log(songData);
  console.log(songStateCopy);

  useEffect(() => {
    dispatch(setSong(songStateCopy));
  }, []);

  useEffect(() => {
    // setting the copy of the selected song from main state to the song slice,
    // which will be used to save the local state of the song
    dispatch(setSong(songStateCopy));
  }, [location.pathname]);

  useEffect(() => {
    //return to homepage after delete song
    if (!songs.find((song) => song.id === songId)) {
      navigate('/');
    }
  }, [songs]);

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
        width: '100%',
        overflow: 'scroll'
      }}
    >
      <input
        className="song-title"
        type="text"
        placeholder="Song Title"
        value={songData.title}
        onChange={(e) => dispatch(updateSongTitle(e.target.value))}
        onFocus={(e) => e.target.select()}
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
