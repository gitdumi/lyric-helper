import React, {useEffect, useRef, useState} from "react";
import SectionLyric from "./SectionLyric";
import {addIconSvg, copyIconSvg, deleteIconSvg, moveIconSvg} from "../../assets/svg/svg";
import {AppData, Lyric, SectionData} from "../../utils/interfaces";
import {useAppData} from "../../AppContext";
import {getLyric} from "../../utils/hipster";
import {reorder} from "../../utils/utils";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

export default function SectionCard(props: { sectionId: string, sectionIndex: number, handleDuplicate: Function, handleDelete: Function }) {
    const {appData, setAppData} = useAppData();
    const {sectionIndex, sectionId, handleDuplicate, handleDelete} = props;
    const sectionData = appData.sections[sectionIndex];
    const {lyrics, count} = sectionData;
    // @ts-ignore
    const [isHover, setIsHover] = useState(false);

    const addButton = useRef(null);

    function handleChange(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setAppData((prevAppData: AppData) => {
            prevAppData.sections[sectionIndex].name = e.target.value;
            return {...prevAppData, sections: prevAppData.sections};
        })
    }

    function addRandomLyric() {
        getLyric((appData.config.selectedSylCount)).then(result => {
            setAppData((prev: AppData) => {
                prev.sections[sectionIndex].lyrics = [
                    ...sectionData.lyrics,
                    result,
                ];
                return {...prev, sections: prev.sections};
            });
        })
    }

    function onDragEnd(result: any) {
        if (!result.destination) {
            return;
        }

        const newLyrics = reorder(
            appData.sections[sectionIndex].lyrics,
            result.source.index,
            result.destination.index
        );

        console.log('lyricDrag', newLyrics)

        setAppData((prev: AppData) => {
            const sections = [...appData.sections]
            sections[sectionIndex].lyrics = [...newLyrics]

            console.log({prev, sections})
            console.log({
                ...prev, sections: sections
            })
            return ({
                ...prev, sections: sections
            })
        });
    }


    const DragHandle = (props: any) => {
        return (<div style={{width: "100%", height: "auto"}}/>)
    }

    const lyricElements = lyrics.map((lyric: Lyric, index: number) => {
        return (
            <Draggable key={lyric.id} draggableId={`SL-${lyric.id}`} index={index}>
                {(provided, snapshot) => {
                    // console.log({index, lyric})
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="draggable-lyric"
                            // style={getItemStyle(
                            //     snapshot.isDragging,
                            //     provided.draggableProps.style
                            // )}
                        >
                            <SectionLyric
                                key={`SL-${lyric.id}`}
                                sectionIndex={sectionIndex}
                                index={index}
                                value={lyric.value}
                            />
                        </div>
                    )
                }}
            </Draggable>
        );
    });

    return (
        <div className="section-card" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

            <div className="section-card--title">
                <input
                    type="text"
                    value={sectionData.name}
                    // ref={inputField}
                    onChange={handleChange}
                    // style={lyricStyle}
                    maxLength={100}
                    style={{width: `${sectionData.name.length}ch`}}
                />
            </div>
            <div className="section-card--content">
                <div className="section-card--content__lyrics">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => {
                                return (
                                    <div className="droppableLyric"
                                         {...provided.droppableProps}
                                         ref={provided.innerRef}
                                        // style={getListStyle(snapshot.isDraggingOver)}
                                    >
                                        <ul>{lyricElements}</ul>
                                    </div>
                                )
                            }}
                        </Droppable>
                    </DragDropContext>
                    {isHover &&
                        <button
                            ref={addButton}
                            className="section-card--content__add svg-button"
                            onClick={async (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                e.nativeEvent.stopImmediatePropagation();
                                addRandomLyric()
                            }}
                        >
                            {addIconSvg}
                        </button>
                    }
                </div>
                {isHover &&
                    <div className="section-card--actions">
                        <button className="section-delete svg-button"
                                onClick={(event => {
                                    handleDelete(event, sectionId)
                                })}>{deleteIconSvg}</button>
                        <button className="section-duplicate svg-button"
                                onClick={(e) => handleDuplicate(e, sectionIndex)}>{copyIconSvg}</button>
                        <button className="section-move svg-button">{moveIconSvg}</button>
                    </div>
                }
            </div>
        </div>
    );
}
