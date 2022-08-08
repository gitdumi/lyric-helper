import {useAppData} from "../AppContext";
import {AppData, SectionData} from "../utils/interfaces";
import SectionCard from "./section/SectionCard";
import React, {useEffect, useState} from "react";
import {useAddSection} from "./sectionHooks";
import {getNewKey, reorder} from "../utils/utils";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {AiOutlinePlusCircle} from "react-icons/all";

export default function LyricHelperMain() {
    const {appData, setAppData} = useAppData();
    const [newSection, setNewSection]: any = useState('')

    useAddSection(newSection)

    function handleAddSection(event: any) {
        event.stopPropagation();
        event.preventDefault();
        let newData: SectionData = {
            id: getNewKey(),
            name: 'Verse',
            color: '#1adebb',
            lyrics: [{id: getNewKey(), value: 'To be or not to be'}],
            count: 0
        }
        setNewSection(newData)
    }

    function handleDuplicateSection(event: any, sectionIndex: number) {
        event.stopPropagation();
        event.preventDefault();
        let duplicate: SectionData = {...appData.sections[sectionIndex]};
        duplicate.id = getNewKey();
        setNewSection(duplicate);
    }

    function handleDeleteSection(event: any, sectionId: string) {
        // event.preventDefault();
        event.stopPropagation();
        setAppData((prev: AppData) => {
            prev.sections = prev.sections.filter((section: SectionData) => section.id != sectionId)
            return {...prev, sections: prev.sections}
        })
    }


    function onDragEnd(result: any) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            appData.sections,
            result.source.index,
            result.destination.index
        );

        setAppData((prev: AppData) => ({
            ...prev, sections: items
        }));
    }

    // const getItemStyle = (isDragging, draggableStyle) => ({
    //     // some basic styles to make the items look a bit nicer
    //     userSelect: "none",
    //     padding: grid * 2,
    //     margin: `0 0 ${grid}px 0`,
    //
    //     // change background colour if dragging
    //     background: isDragging ? "lightgreen" : "grey",
    //
    //     // styles we need to apply on draggables
    //     ...draggableStyle
    // });
    //
    // const getListStyle = isDraggingOver => ({
    //     background: isDraggingOver ? "lightblue" : "lightgrey",
    //     padding: grid,
    //     width: 250
    // });

    const sectionComponents = appData.sections.map((section: SectionData, index: number) => (
        <Draggable key={section.id} draggableId={section.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        id="draggable-section"
                        // style={getItemStyle(
                        //     snapshot.isDragging,
                        //     provided.draggableProps.style
                        // )}
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
                <button id="add-section" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddSection(e);
                }}><AiOutlinePlusCircle className="react-button"/>section
                </button>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                // style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {sectionComponents}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            </div>
        </DragDropContext>
    )
};
