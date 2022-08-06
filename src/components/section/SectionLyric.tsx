import {LegacyRef, useRef, useState} from "react";
// @ts-ignore
import {getLyric, getSyllableCount} from "../../utils/hipster.ts";
import {deleteIconSvg, diceIconSvg, moveIconSvg} from "../../assets/svg/svg";
import {AppData} from "../../utils/interfaces";
import {useAppData} from "../../AppContext";
import {getNewKey} from "../../utils/utils";

export default function SectionLyric(props: {
    index: number;
    sectionIndex: number;
    lyricId: string;
    value: string;
}) {
    const [isHover, setIsHover] = useState(false);
    const {appData, setAppData} = useAppData();
    const {index, sectionIndex} = props;
    const {value, id} = appData.sections[sectionIndex].lyrics[index];

    const randomButton = useRef() as LegacyRef<HTMLButtonElement>;
    const inputField = useRef() as LegacyRef<HTMLInputElement>;

    function handleChange(e: any, lyricId: string) {
        console.log(`change section ${sectionIndex} lyric ${index}`)
        setAppData((prevAppData: AppData) => {
            const newLyrics = [...prevAppData.sections[sectionIndex].lyrics].map(lyr => {
                console.log(lyr.id)
                if (lyr.id === lyricId) {
                    return {id: getNewKey(), value: e.target.value}
                } else {
                    return lyr
                }
            })

            prevAppData.sections[sectionIndex] = {...prevAppData.sections[sectionIndex], lyrics: newLyrics}
            const newSections = [...prevAppData.sections]

            return {...prevAppData, sections: newSections};
        })
        console.log(appData)
    }

    async function handleRandom(e: any) {
        e.stopPropagation();
        // @ts-ignore
        randomButton.current.disabled = true;
        // @ts-ignore
        inputField.current.value = "loading...";
        const result = await getLyric();
        setAppData((prevAppData: AppData) => {
            prevAppData.sections[sectionIndex].lyrics[index] = result;
            return {...prevAppData, sections: prevAppData.sections};
        })
        //@ts-ignore
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

    const lyricStyle = {
        filter: 'invert(0.99)'
    };

    return (
        <div className="section-lyric" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {isHover && <button
                className="section-lyric--actions__random svg-button"
                onClick={async (e) => {
                    await handleRandom(e);
                }}
                ref={randomButton}
            >
                {diceIconSvg}
            </button>}

            <input
                type="text"
                value={value}
                ref={inputField}
                onChange={(e) => {
                    handleChange(e, id);
                }}
                style={isHover ? lyricStyle : {padding: '0.2rem 1.5rem'} }
                maxLength={70}
            />
            {isHover &&
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
                </div>}
        </div>
    );
}
