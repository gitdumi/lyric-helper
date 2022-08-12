import {SongContextProvider, useSongData} from "../../context/SongContext";
import {SongData, SectionData} from "../../utils/interfaces";
import SectionCard from "./section/SectionCard";
import React, {useEffect, useState} from "react";
import {useAddSection} from "./sectionHooks";
import {getNewKey, reorder} from "../../utils/utils";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {AiOutlinePlusCircle} from "react-icons/all";
import {ANIMATION_TIMEOUT, COLORS} from "../../utils/constants";

export default function SongContent() {
    const {songData, setSongData} = useSongData();
    const [newSection, setNewSection]: any = useState('')

    useAddSection(newSection)

    function handleAddSection() {
        let newData: SectionData = {
            id: getNewKey(),
            name: 'Verse',
            color: COLORS.GREEN,
            lyrics: [{id: getNewKey(), value: 'To be or not to be'}],
            count: 0
        }
        setNewSection(newData)
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

    function handleSaveSong() {

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
            <footer className="main-footer">
                <button onClick={handleSaveSong}>Save</button>
            </footer>
        </DragDropContext>
    )
};
