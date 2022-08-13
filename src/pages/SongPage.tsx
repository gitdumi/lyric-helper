import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {AiOutlinePlusCircle} from "react-icons/all";
import {useAddSection} from "../components/song/songHooks";
import {SectionData, SongData} from "../utils/interfaces";
import {generateNewEntity, NEW_SECTION} from "../context/InitData";
import {getNewKey, reorder} from "../utils/utils";
import {ANIMATION_TIMEOUT, LS_KEYS, MAX_CHARS} from "../utils/constants";
import SectionCard from "../components/song/section/SectionCard";
import {COLORS, theme} from "../lib/Theme";
import {useSongData} from "../context/SongContext";
import "./SongPage.css"
import {Box, Button} from "@mui/material";

export default function SongPage() {
    const {songData, setSongData} = useSongData();
    const [newSection, setNewSection]: any = useState('');
    const [currentSongId] = useState(localStorage.getItem(LS_KEYS.CURRENT));

    useEffect(() => {
        // @ts-ignore
        const songs = JSON.parse(localStorage.getItem(LS_KEYS.SONGS));
        const index = songs.findIndex((song: SongData)=> song.id === currentSongId);
        setSongData(songs[index])
    }, [currentSongId]);

    useAddSection(newSection)

    function handleTitleChange(e: any) {
        setSongData((prev: SongData) => ({...prev, title: e.target.value || 'Song title'}))
    }

    function handleAddSection() {
        setNewSection(generateNewEntity(NEW_SECTION))
    }

    function handleDuplicateSection(sectionIndex: number) {
        let duplicate: SectionData = {...songData.sections[sectionIndex]};
        duplicate.id = getNewKey();
        setNewSection(duplicate);
    }

    function handleDeleteSection(event: any, sectionId: string) {
        // event.preventDefault();
        event.stopPropagation();
        const container = event.currentTarget.closest(".section-card");
        container.style.transition = "all 0.5s";
        container.style.opacity = "0";
        setTimeout(function () {
            setSongData((prev: SongData) => {
                prev.sections = prev.sections.filter((section: SectionData) => section.id != sectionId)
                return {...prev, sections: prev.sections}
            })
        }, ANIMATION_TIMEOUT)
    }

    function handleSaveSong() {
        //todo: fix ts
        // @ts-ignore
        const songs: SongData[] = JSON.parse(localStorage.getItem('SONGS'))
        // @ts-ignore
        const index = songs.findIndex(song => song.id === songData.id)
        songs[index] = songData
        localStorage.setItem(LS_KEYS.SONGS, JSON.stringify([...songs]))
        console.log('saved song')
    }

    function handleDeleteSong() {
        // @ts-ignore
        const songs: SongData[] = JSON.parse(localStorage.getItem('SONGS'))
        localStorage.setItem(LS_KEYS.SONGS, JSON.stringify(songs.filter((song: SongData) => song.id != currentSongId)))
        console.log('deleted song')
    }

    function onDragEnd(result: any) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            songData.sections,
            result.source.index,
            result.destination.index
        );

        setSongData((prev: SongData) => ({
            ...prev, sections: items
        }));
    }

    const sectionComponents = songData.sections.map((section: SectionData, index: number) => (
        <Draggable key={section.id} draggableId={section.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        id="draggable-section"
                    >
                        <SectionCard
                            provided={{...provided}}
                            key={`SC-${section.id}`}
                            sectionIndex={index}
                            sectionId={section.id}
                            handleDuplicate={handleDuplicateSection}
                            handleDelete={handleDeleteSection}
                        />
                    </div>
                )
            }}
        </Draggable>))

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="main">
                <button id="add-section" onClick={handleAddSection}>
                    <AiOutlinePlusCircle className="react-button"/>section
                </button>
                <input className="song-title"
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
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {sectionComponents}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            </div>
            <Box display="flex" sx={{justifyContent: 'center'}}>
                <Button variant="contained" sx={{justifySelf: 'center', m: '1rem'}} onClick={handleSaveSong}>Save</Button>
                <Button variant="contained" sx={{backgroundColor: theme.palette.error.main, justifySelf: 'center', m: '1rem'}} onClick={handleDeleteSong} href={"/"}>Delete</Button>
            </Box>
        </DragDropContext>
    )
}