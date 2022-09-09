import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { reorder } from '../../../utils/utils';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { MAX_CHARS, RESPONSIVE_WIDTH } from '../../../utils/constants';
import SectionCard from '../../components/song/sectionCard';
import { COLORS, theme } from '../../../lib/Theme';
import './SongPage.css';
import { Box, Button, Input, Paper, Tooltip, useMediaQuery } from '@mui/material';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSong,
  saveSong,
  selectCurrentSongId,
  selectPickedSong,
  selectSongs,
  setCurrentSongId
} from '../../store/mainSlice';
import {
  addSection,
  updateSongTitle,
  selectCurrentSong,
  deleteSection,
  duplicateSection,
  reorderSections,
  setSong
} from '../../store/currentSongSlice';
import { SectionState } from '../../store/utils/interfaces';
import { addNotification } from '../../store/notificationSlice';
import CustomInput from '../../components/misc/customInput';
import LyricsSharpIcon from '@mui/icons-material/LyricsSharp';
import { NOTIFICATIONS } from '../../components/misc/popUpMessage';
import useLyricDb from '../../hooks/dbHook';
import { selectCurrentSylCount, setCurrent } from '../../store/dbSlice';
import SyllableCountInput from '../../components/song/syllableCountInput/SyllableCountInput';

function SongPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const songs = useSelector(selectSongs);
  const currentSong = useSelector(selectPickedSong);
  const currentSongId = useSelector(selectCurrentSongId);
  const urlId = useParams().songId;
  const songData = useSelector(selectCurrentSong);
  const { db, setCurrentSylCount } = useLyricDb();
  const isResponsive = useMediaQuery(`(max-width: ${RESPONSIVE_WIDTH})`);

  useEffect(() => {
    //Setting the song in store to the selected one
    if (songs.length > 0 && songs.findIndex((song) => song.id === urlId) != -1) {
      dispatch(setSong(currentSong));
    } else {
      isResponsive ? navigate('/menu') : navigate('/');
    }
  }, [songs, location.pathname, currentSongId]);

  function handleSaveSong() {
    dispatch(saveSong(songData));
    dispatch(addNotification(NOTIFICATIONS.SAVE_SONG));
  }

  function handleDeleteSong() {
    dispatch(deleteSong(songData));
    dispatch(addNotification(NOTIFICATIONS.DELETED));
    navigate('/');
    dispatch(setCurrentSongId('0'));
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
          <div
            className="section-cards"
            ref={provided.innerRef}
            {...provided.draggableProps}
            id="draggable-section"
          >
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
      className="song-box"
      sx={{
        ml: isResponsive ? '1rem' : '4rem'
      }}
    >
      {!isResponsive && <SyllableCountInput responsive={false} />}
      <CustomInput
        className="song-title"
        placeholder="Song Title"
        value={songData.title}
        handleChange={(e) => dispatch(updateSongTitle(e.target.value))}
        max={MAX_CHARS / 2}
        style={{
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
            marginTop: `${songData.sections?.length > 0 ? '0' : '1rem'}`
          }}
          id="add-section"
          onClick={() => {
            dispatch(addSection());
          }}
        >
          <div className="react-button">
            <ControlPointIcon />
          </div>
          <span>section</span>
        </button>
      </DragDropContext>
      <Paper
        className="song-footer"
        elevation={3}
        sx={{
          ml: isResponsive ? '0rem' : '4rem'
          // justifyContent: isResponsive ? 'space-between' : 'center'
        }}
      >
        {isResponsive && (
          <>
            <LyricsSharpIcon
              className="responsive-menu-nav"
              sx={{
                color: theme.palette.primary.main
              }}
              onClick={() => {
                dispatch(setCurrentSongId('0'));
                navigate('/menu');
              }}
            />
            <SyllableCountInput responsive={true} />
          </>
        )}
        <Button className="save-song" variant="contained" onClick={handleSaveSong}>
          Save
        </Button>

        <Tooltip placement="top" title="delete song">
          <HighlightOffSharpIcon
            className="svg-wrapper react-button"
            id="deleteSongButtonIcon"
            onClick={handleDeleteSong}
            sx={{
              color: theme.palette.error.main,
              cursor: 'pointer'
            }}
          />
        </Tooltip>
      </Paper>
    </Box>
  );
}

export default SongPage;
