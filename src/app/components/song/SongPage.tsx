import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlusCircle } from 'react-icons/all';
import { reorder } from '../../../utils/utils';
import { MAX_CHARS, RESPONSIVE_WIDTH } from '../../../utils/constants';
import SectionCard from './section/SectionCard';
import { COLORS, theme } from '../../../lib/Theme';
import './SongPage.css';
import { Box, Button, Paper, Tooltip, useMediaQuery } from '@mui/material';
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
import { addNotification } from '../misc/notificationSlice';
import { NOTIFICATIONS } from '../misc/PopUpMessage';

function SongPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const songs = useSelector(selectSongs);
  const currentSong = useSelector(selectPickedSong);
  const currentSongId = useSelector(selectCurrentSongId);
  const songData = useSelector(selectCurrentSong);

  const isResponsive = useMediaQuery(`(max-width: ${RESPONSIVE_WIDTH})`);

  useEffect(() => {
    //Setting the song in store to the selected one
    //Also, once the song list gets modified, updating the song slice with the newly selected song (fixes navigation after delete)
    if (songs.length > 0) {
      dispatch(setSong(currentSong));
    } else {
      navigate('/');
    }
  }, [songs, location.pathname, currentSongId]);

  function handleSaveSong() {
    dispatch(saveSong(songData));
    dispatch(addNotification(NOTIFICATIONS.SAVE_SONG));
  }

  function handleDeleteSong() {
    dispatch(deleteSong(songData));
    dispatch(addNotification(NOTIFICATIONS.DELETED));
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

  const sectionComponents = songData?.sections?.map((section: SectionState, index: number) => (
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
              handleDelete={() => dispatch(deleteSection(section.id))}
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
        pl: '3rem',
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
          minWidth: `${(songData.title?.length ?? 0) + 1}ch`,
          color: `${songData.sections?.[0]?.color || COLORS.GREEN}`
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
            marginTop: `${songData.sections?.length > 0 ? '0' : '1rem'}`
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
          onClick={handleSaveSong}
        >
          Save
        </Button>

        <Tooltip placement="top" title="delete song">
          <HighlightOffSharpIcon
            className="svg-wrapper react-button"
            id="deleteSongButtonIcon"
            onClick={handleDeleteSong}
            sx={{
              color: theme.palette.error.main,
              justifySelf: 'center',
              mr: '2rem',
              fontSize: 30,
              ml: 'auto',
              cursor: 'pointer'
            }}
          />
        </Tooltip>
      </Paper>
    </Box>
  );
}

export default SongPage;
