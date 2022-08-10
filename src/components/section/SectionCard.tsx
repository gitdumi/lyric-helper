import React, {useEffect, useRef, useState} from "react";
import SectionLyric from "./SectionLyric";
import {AppData, Lyric, SectionData} from "../../utils/interfaces";
import {useAppData} from "../../AppContext";
import {getLyric} from "../../utils/hipster";
import {reorder} from "../../utils/utils";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {AiOutlineCloseCircle, AiOutlinePlusCircle, IoSyncCircleOutline, GoPrimitiveDot} from "react-icons/all";
import {MAX_CHARS, SECTION_COLORS} from "../../utils/constants";
import {GithubPicker} from "react-color";


export default function SectionCard(props: { sectionId: string, sectionIndex: number, handleDuplicate: Function, handleDelete: Function, provided: any }) {
    const {appData, setAppData} = useAppData();
    const {sectionIndex, sectionId, handleDuplicate, handleDelete, provided} = props;
    const sectionData = appData.sections[sectionIndex];
    const {lyrics, count} = sectionData;
    // @ts-ignore
    const [isHover, setIsHover] = useState(false);
    const [isHoverColorPicker, setIsHoverColorPicker] = useState(false);

    const addButton = useRef(null);

    function getVisibility(): any {
        return {visibility: `${isHover || isHoverColorPicker ? 'visible' : 'hidden'}`};
    }

    function handleChange(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setAppData((prevAppData: AppData) => {
            prevAppData.sections[sectionIndex].name = e.target.value;
            return {...prevAppData, sections: prevAppData.sections};
        })
    }

    function handleColorChange(color: any, event: any) {
        setAppData((prev: AppData) => {
            const sections = [...prev.sections];
            sections[sectionIndex].color = color.hex;
            return {...prev, sections: sections}
        })
        setIsHoverColorPicker(false)
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

    const lyricElements = lyrics.map((lyric: Lyric, index: number) => {
        return (
            <Draggable key={lyric.id} draggableId={`SL-${lyric.id}`} index={index}>
                {(provided, snapshot) => {
                    // console.log({index, lyric})
                    return (
                        <div
                            ref={provided.innerRef}
                            className="draggable-lyric"
                            {...provided.draggableProps}
                            // style={getItemStyle(
                            //     snapshot.isDragging,
                            //     provided.draggableProps.style
                            // )}
                        >
                            <SectionLyric
                                provided={{...provided}}
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
        <div className="section-card" style={{
            backgroundColor: sectionData.color, border: 'solid 2px ' + sectionData.color,
            boxShadow: '5px 5px 0 ' + sectionData.color
        }}>

            <div ref={provided.innerRef} {...provided.dragHandleProps} className="section-card--title"
                 onMouseEnter={() => setIsHover(true)}
                 onMouseLeave={() => setIsHover(false)}
            >

                <input
                    type="text"
                    value={sectionData.name}
                    // ref={inputField}
                    onChange={handleChange}
                    maxLength={MAX_CHARS / 3}
                    style={{width: `${sectionData.name.length + 3 + 'ch'}`, color: sectionData.color}}
                />

                <div className="section-card--actions">
                    <button
                        ref={addButton}
                        className="section-card--content__add svg-wrapper"
                        onClick={async (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            e.nativeEvent.stopImmediatePropagation();
                            addRandomLyric()
                        }}
                    >
                        <AiOutlinePlusCircle color={sectionData.color} style={getVisibility()}
                                             className="react-button"/>
                    </button>
                    <button className="section-card--content__delete svg-wrapper"
                            onClick={(event => {
                                handleDelete(event, sectionId)
                            })}>
                        <AiOutlineCloseCircle className="react-button"
                                              color={sectionData.color} style={getVisibility()}/>
                    </button>
                    <button className="section-duplicate svg-wrapper"
                            onClick={(e) => handleDuplicate(e, sectionIndex)}>
                        <IoSyncCircleOutline className="react-button"
                                             color={sectionData.color} style={getVisibility()}/>
                    </button>

                    <div className="section-card--actions__color-picker"
                         color={sectionData.color}
                         style={{visibility: getVisibility()}}>
                        <GoPrimitiveDot color={sectionData.color} style={{visibility: getVisibility()}}/>
                        <GithubPicker className="color-picker" width="100px" triangle={"top-right"}
                                      colors={SECTION_COLORS}
                                      onChangeComplete={handleColorChange}/>
                    </div>
                </div>
            </div>


            <div className="section-card--content">
                <div className="section-card--content__lyrics" style={{backgroundColor: 'transparent'}}>

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
                                        {provided.placeholder}
                                    </div>
                                )
                            }}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
}
