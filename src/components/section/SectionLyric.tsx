import React, {LegacyRef, useRef, useState} from "react";
// @ts-ignore
import {getLyric, getSyllableCount} from "../../utils/hipster.ts";
import {AppData} from "../../utils/interfaces";
import {useAppData} from "../../AppContext";
import {AiOutlineCloseCircle, IoColorWandOutline} from "react-icons/all";
import {ANIMATION_TIMEOUT, MAX_CHARS} from "../../utils/constants";

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
        //@ts-ignore
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
    }

    const handleDelete = (event: any, index: number) => {
        event.preventDefault();
        const updatedLyrics = appData.sections[sectionIndex].lyrics.filter((lyr: object, i: number) => {
            return i != index;
        });
        const container = event.currentTarget.closest(".section-lyric");
        container.style.transition = "all 0.5s";
        container.style.opacity = "0";
        setTimeout(function() {
            setAppData((prev: AppData) => {
                prev.sections[sectionIndex].lyrics = updatedLyrics;
                return {...prev, sections: prev.sections};
            })
        }, ANIMATION_TIMEOUT)

    }

    return (
        <li {...provided.dragHandleProps} className="section-lyric" onMouseEnter={() => setIsHover(true)}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>

            <button
                className="section-lyric--actions__random svg-wrapper"
                onClick={async (e) => {
                    await handleRandom(e);
                }}
                ref={randomButton}
            >
                <IoColorWandOutline className="react-button" color={isHover? 'black':'transparent'}/>
            </button>

            <input
                type="text"
                value={value}
                ref={inputField}
                onChange={handleChange}
                style={{width: value.length + 1 + 'ch'}}
                maxLength={MAX_CHARS}
            />
            <div className={`section-lyric--actions`} >
                <div style={{width: "2rem"}}/>
                <button
                    className="section-lyric--actions__delete svg-wrapper"
                    onClick={(e) => {
                        handleDelete(e, index)
                        e.stopPropagation();
                    }}
                >
                    <AiOutlineCloseCircle className="react-button" color={isHover? 'black':'transparent'}/>
                </button>
            </div>
        </li>
    );
}
