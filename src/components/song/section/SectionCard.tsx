import React, {useEffect, useRef, useState} from "react";
import SectionLyric from "./SectionLyric";
import {SongData, Lyric, SectionData} from "../../../utils/interfaces";
import {useSongData} from "../../../context/SongContext";
import {getLyric} from "../../../utils/hipster";
import {reorder} from "../../../utils/utils";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {
    AiOutlineCloseCircle,
    AiOutlinePlusCircle,
    IoSyncCircleOutline,
    GoPrimitiveDot,
    FiDivideCircle
} from "react-icons/all";
import {MAX_CHARS} from "../../../utils/constants";
import {GithubPicker} from "react-color";
import "./SectionCard.css"
import {SECTION_COLORS} from "../../../lib/Theme";


export default function SectionCard(props: { sectionId: string, sectionIndex: number, handleDuplicate: Function, handleDelete: Function, provided: any }) {
    const {songData, setSongData} = useSongData();
    const {sectionIndex, sectionId, handleDuplicate, handleDelete, provided} = props;
    const sectionData = songData.sections[sectionIndex];
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
        setSongData((prevsongData: SongData) => {
            prevsongData.sections[sectionIndex].name = e.target.value;
            return {...prevsongData, sections: prevsongData.sections};
        })
    }

    function handleColorChange(color: any, event: any) {
        setSongData((prev: SongData) => {
            const sections = [...prev.sections];
            sections[sectionIndex].color = color.hex;
            return {...prev, sections: sections}
        })
        setIsHoverColorPicker(false)
    }

    function addRandomLyric() {
        getLyric((songData.config.selectedSylCount)).then(result => {
            setSongData((prev: SongData) => {
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
            songData.sections[sectionIndex].lyrics,
            result.source.index,
            result.destination.index
        );

        setSongData((prev: SongData) => {
            const sections = [...songData.sections]
            sections[sectionIndex].lyrics = [...newLyrics]

            return ({
                ...prev, sections: sections
            })
        });
    }

    const lyricElements = lyrics.map((lyric: Lyric, index: number) => {
        return (
            <Draggable key={lyric.id} draggableId={`SL-${lyric.id}`} index={index}>
                {(provided, snapshot) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            className="draggable-lyric"
                            {...provided.draggableProps}
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
                 onMouseOver={() => setIsHover(true)}
                 onMouseLeave={() => setIsHover(false)}
            >
                <div className="section-card--title__left">
                    <input
                        type="text"
                        placeholder="Section"
                        value={sectionData.name}
                        // ref={inputField}
                        onChange={handleChange}
                        minLength={3}
                        maxLength={MAX_CHARS / 3}
                        style={{minWidth: '7ch',width: `${sectionData.name.length *1.1 }ch`,color: sectionData.color}}
                    />
                    <button
                        ref={addButton}
                        className="section-card--content__add svg-wrapper"
                        onClick={async (e) => {
                            e.nativeEvent.stopImmediatePropagation();
                            addRandomLyric()
                        }}
                    >
                        <AiOutlinePlusCircle color={sectionData.color} style={getVisibility()}
                                             className="react-button"/>
                    </button>
                </div>

                <div className="section-card--actions">
                    <button className="section-card--content__delete svg-wrapper"
                            onClick={(event => {
                                handleDelete(event, sectionId)
                            })}>
                        <AiOutlineCloseCircle className="react-button"
                                              color={sectionData.color} style={getVisibility()}/>
                    </button>
                    <button className="section-duplicate svg-wrapper"
                            onClick={(e) => handleDuplicate(sectionIndex)}>
                        <IoSyncCircleOutline className="react-button sync"
                                             color={sectionData.color} style={getVisibility()}/>
                    </button>

                    <button
                        ref={addButton}
                        className="section-card--content__add svg-wrapper"
                        onClick={async (e) => {

                        }}
                    >
                        <FiDivideCircle color={sectionData.color} style={getVisibility()}
                                        className="react-button divide"/>
                    </button>

                    <div className="section-card--actions__color-picker"
                         color={sectionData.color}
                         style={{visibility: getVisibility()}}>
                        <GoPrimitiveDot color={sectionData.color} style={{visibility: getVisibility()}}/>
                        <GithubPicker className="color-picker" width="112px" triangle={"top-right"}
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
