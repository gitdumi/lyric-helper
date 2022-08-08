import React, {LegacyRef, useRef, useState} from "react";
// @ts-ignore
import {getLyric, getSyllableCount} from "../../utils/hipster.ts";
import {deleteIconSvg, wandIconSvg, moveIconSvg} from "../../assets/svg/svg";
import {AppData} from "../../utils/interfaces";
import {useAppData} from "../../AppContext";
import {AiOutlineCloseCircle, IoColorWandOutline} from "react-icons/all";

export default function SectionLyric(props: {
    index: number;
    sectionIndex: number;
    value: string;
    provided: any;
}) {
    const {appData, setAppData} = useAppData();
    const [isHover, setIsHover] = useState(false);
    const {index, sectionIndex, provided} = props;
    const {value, id} = appData.sections[sectionIndex].lyrics[index];

    const randomButton = useRef() as LegacyRef<HTMLButtonElement>;
    const inputField = useRef() as LegacyRef<HTMLInputElement>;

    function handleChange(e: any) {
        console.log(`change section ${sectionIndex} lyric ${index}`)
        setAppData((prevAppData: AppData) => {
            const newLyrics = [...prevAppData.sections[sectionIndex].lyrics].map((lyr, i) => {
                if (lyr.id === id) {
                    return {id: id, value: e.target.value}
                } else {
                    return lyr
                }
            })

            prevAppData.sections[sectionIndex] = {...prevAppData.sections[sectionIndex], lyrics: newLyrics}
            const newSections = [...prevAppData.sections]

            return {...prevAppData, sections: newSections};
        })
    }

    async function handleRandom(e: any) {
        e.stopPropagation();
        // @ts-ignore
        randomButton.current.disabled = true;
        // @ts-ignore
        inputField.current.value = "loading...";
        const result = await getLyric();
        setAppData((prevAppData: AppData) => {
            prevAppData.sections[sectionIndex].lyrics = prevAppData.sections[sectionIndex].lyrics.map(lyr => {
                if (lyr.id === id) {
                    return result;
                } else {
                    return lyr
                }
            });
            return {...prevAppData, sections: prevAppData.sections};
        })
        // @ts-ignore
        randomButton.current.disabled = false;
    }

    const handleDelete = (event: any, index: number) => {
        event.preventDefault();
        const updatedLyrics = appData.sections[sectionIndex].lyrics.filter((lyr: object, i: number) => {
            return i != index;
        });
        setAppData((prev: AppData) => {
            prev.sections[sectionIndex].lyrics = updatedLyrics;
            return {...prev, sections: prev.sections};
        })
    }

    const hoverLyricStyle = {
        width: `${value.length}ch`
    };
    const lyricStyle = {padding: '0.4rem 1.5rem', width: `${value.length}ch`}

    return (
        <li {...provided.dragHandleProps} className="section-lyric" onMouseEnter={() => setIsHover(true)}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>

            {isHover &&
                <button
                    className="section-lyric--actions__random svg-wrapper"
                    onClick={async (e) => {
                        await handleRandom(e);
                    }}
                    ref={randomButton}
                >
                    <IoColorWandOutline className="react-button" color='white'/>
                </button>
            }

            <input
                type="text"
                value={value}
                ref={inputField}
                onChange={handleChange}
                style={isHover ? hoverLyricStyle : lyricStyle}
                maxLength={70}
            />
            {isHover &&
                <div className="section-lyric--actions">
                    {/*<div  className="section-lyric--actions__drag svg-button">*/}
                    {/*    {moveIconSvg}*/}
                    {/*</div>*/}
                    {/* <button>Duplicate</button> */}
                    <button
                        className="section-lyric--actions__delete svg-wrapper"
                        onClick={(e) => {
                            handleDelete(e, index)
                            e.stopPropagation();
                        }}
                    >
                        <AiOutlineCloseCircle className="react-button" color={'white'}/>
                    </button>
                </div>
            }
        </li>
    );
}
