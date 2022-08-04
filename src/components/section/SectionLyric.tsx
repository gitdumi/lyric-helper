import {useEffect, useState, useRef, LegacyRef} from "react";
// @ts-ignore
import {getLyric, getSyllableCount} from "../../utils/hipster.ts";
import {moveIconSvg, deleteIconSvg, diceIconSvg} from "../../assets/svg/svg";
import {AppData} from "../../utils/interfaces";
import {useAppData} from "../../AppContext";

export default function SectionLyric(props: {
    index: number;
    sectionIndex: number;
    lyricId: string;
    value: string;
}) {
    const {appData, setAppData} = useAppData();
    const {index, sectionIndex, lyricId} = props;
    const value = appData.sections[sectionIndex].lyrics[index];

    const randomButton = useRef() as LegacyRef<HTMLButtonElement>;
    const inputField = useRef() as LegacyRef<HTMLInputElement>;

    function handleChange(e: any) {
        console.log(`change section ${sectionIndex} lyric ${index}`)
        setAppData((prevAppData: AppData) => {
            console.log(sectionIndex)
            console.log(index)
            console.log(prevAppData.sections[0].lyrics)
            console.log(prevAppData.sections[1].lyrics)
                prevAppData.sections[sectionIndex].lyrics[index] = e.target.value;
            // prevAppData.sections[sectionIndex] = {...prevAppData.sections[sectionIndex], lyrics: prevAppData.sections[sectionIndex].lyrics}
            // console.log(prevAppData.sections)
            console.log(prevAppData.sections[0].lyrics)
            console.log(prevAppData.sections[1].lyrics)

            return {...prevAppData, sections: prevAppData.sections};
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
            prevAppData.sections[sectionIndex].lyrics[index] = result.lyric;
            return {...prevAppData, sections: prevAppData.sections};
        })
        //@ts-ignore
        randomButton.current.disabled = false;
    }

    const handleDelete = (event: any, index: number) => {
        event.preventDefault();
        const updatedLyrics = appData.sections[sectionIndex].lyrics.filter((lyr: object, i: number) => {
            console.log(lyr, i);
            return i != index;
        });
        setAppData((prev: AppData) => {
            prev.sections[sectionIndex].lyrics = updatedLyrics;
            return {...prev, sections: prev.sections};
        })
    }

    const lyricStyle = {
        width: `${value.length / 2.5}rem`,
    };

    return (
        <div className="section-lyric">
            <button
                className="section-lyric--actions__random svg-button"
                id="random-lyric-button"
                onClick={async (e) => {
                    await handleRandom(e);
                }}
                ref={randomButton}
                // style={lyricStyle}
            >
                {diceIconSvg}
            </button>
            <input
                type="text"
                value={value}
                ref={inputField}
                onChange={(e) => {
                    handleChange(e);
                }}
                // style={lyricStyle}
                maxLength={70}
                style={{width: `${value.length / 2.5}rem`}}
            />
            <div className="section-lyric--actions">
                <div className="section-lyric--actions__drag svg-button">
                    {moveIconSvg}
                </div>
                {/* <button>Duplicate</button> */}
                <button
                    className="section-lyric--actions__delete svg-button"
                    onClick={(e) => {
                        handleDelete(e, index)
                        e.stopPropagation();
                    }}
                >
                    {deleteIconSvg}
                </button>
            </div>
        </div>
    );
}
