import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlusCircle } from 'react-icons/all';
import { useAddSection } from '../components/song/songHooks';
import { SectionData, SongData } from '../utils/interfaces';
import { generateNewEntity, NEW_SECTION } from '../context/InitData';
import { getNewKey, reorder } from '../utils/utils';
import { ANIMATION_TIMEOUT, LS_KEYS, MAX_CHARS } from '../utils/constants';
import SectionCard from '../components/song/section/SectionCard';
import { COLORS, theme } from '../lib/Theme';
import { useSongData } from '../context/SongContext';
import './SongPage.css';
import { Box, Button, Paper } from '@mui/material';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import { useLocation, useNavigate } from 'react-router-dom';

function SongPage() {
  const { songData, setSongData } = useSongData();
  const [newSection, setNewSection] = useState<SectionData>();
  const [currentSongId, setCurrentSongId] = useState(localStorage.getItem(LS_KEYS.CURRENT));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentSongId = location.pathname.match(new RegExp('[A-z0-9]{20}$'))![0];
    setCurrentSongId(currentSongId);
  }, [location]);

  useEffect(() => {
    const songs = JSON.parse(localStorage.getItem(LS_KEYS.SONGS) || '[]');
    const index = songs.findIndex((song: SongData) => song.id === currentSongId);
    setSongData(songs[index]);
  }, [currentSongId]);

  useAddSection(newSection);

  function handleTitleChange(e: { target: { value: string } }) {
    setSongData((prev: SongData) => ({ ...prev, title: e.target.value || 'Song title' }));
  }

  function handleAddSection() {
    setNewSection(generateNewEntity(NEW_SECTION()));
  }

  function handleDuplicateSection(sectionIndex: number) {
    const duplicate: SectionData = { ...songData.sections[sectionIndex] };
    duplicate.id = getNewKey();
    setNewSection(duplicate);
  }

  function handleDeleteSection(
    event: { stopPropagation: () => void; currentTarget: { closest: (arg0: string) => any } },
    sectionId: string
  ) {
    event.stopPropagation();
    const container = event.currentTarget.closest('.section-card');
    container.style.transition = 'all 0.5s';
    container.style.opacity = '0';
    setTimeout(function () {
      setSongData((prev: SongData) => {
        prev.sections = prev.sections.filter((section: SectionData) => section.id != sectionId);
        return { ...prev, sections: prev.sections };
      });
    }, ANIMATION_TIMEOUT);
  }

  function handleSaveSong() {
    const songs: SongData[] = JSON.parse(localStorage.getItem('SONGS') || '[]');
    const index = songs.findIndex((song) => song.id === songData.id);
    songs[index] = songData;
    localStorage.setItem(LS_KEYS.SONGS, JSON.stringify([...songs]));
    console.log('saved song');
  }

  function handleDeleteSong() {
    const songs: SongData[] = JSON.parse(localStorage.getItem('SONGS') || '[]');
    localStorage.setItem(
      LS_KEYS.SONGS,
      JSON.stringify(songs.filter((song: SongData) => song.id != currentSongId))
    );
    localStorage.setItem(LS_KEYS.CURRENT, '0');
    console.log('deleted song');
  }

  function onDragEnd(result: { destination: { index: number }; source: { index: number } }) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(songData.sections, result.source.index, result.destination.index);

    setSongData((prev: SongData) => ({
      ...prev,
      sections: items
    }));
  }

  const sectionComponents = songData.sections.map((section: SectionData, index: number) => (
    <Draggable key={section.id} draggableId={section.id} index={index}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} id="draggable-section">
            <SectionCard
              provided={{ ...provided }}
              key={`SC-${section.id}`}
              sectionIndex={index}
              sectionId={section.id}
              handleDuplicate={handleDuplicateSection}
              handleDelete={handleDeleteSection}
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
        onChange={handleTitleChange}
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
          onClick={handleAddSection}
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

        <HighlightOffSharpIcon
          className="svg-wrapper react-button"
          id="deleteSongButtonIcon"
          onClick={() => {
            handleDeleteSong();
            navigate('/');
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
