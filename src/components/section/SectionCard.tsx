import {useEffect, useRef, useState} from "react";
import SectionLyric from "./SectionLyric";
import {addIconSvg, copyIconSvg, deleteIconSvg, moveIconSvg} from "../../assets/svg/svg";
import {AppData, Lyric, SectionData} from "../../utils/interfaces";
import {useAppData} from "../../AppContext";
import {getLyric} from "../../utils/hipster";

export default function SectionCard(props: { sectionId: string, sectionIndex: number, handleDuplicate: Function, handleDelete: Function }) {
    const {appData, setAppData} = useAppData();
    const {sectionIndex, sectionId, handleDuplicate, handleDelete} = props;
    const sectionData = appData.sections[sectionIndex];
    const {lyrics, count} = sectionData;
    // @ts-ignore
    const [randomLyric, setRandomLyric] = useState<Lyric>(null);
    const [isHover, setIsHover] = useState(false);

    const addButton = useRef(null);

    useEffect(() => {
        if (randomLyric) {
            setAppData((prev: AppData) => {
                prev.sections[sectionIndex].lyrics = [
                    ...sectionData.lyrics,
                    randomLyric,
                ];
                return {...prev, sections: prev.sections};
            });
        }
    }, [randomLyric])

    function updateRandomLyric() {
        getLyric((appData.config.selectedSylCount)).then(result => {
            setRandomLyric(result)
        })
    }

    const lyricElements = lyrics.map((text: string, index: number) => {
        return (
            <SectionLyric
                key={`SL${sectionIndex}${index}`}
                lyricId={`SL${sectionIndex}${index}${sectionId}`}
                sectionIndex={sectionIndex}
                index={index}
                value={text}
            />
        );
    });

    function handleChange(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setAppData((prevAppData: AppData) => {
            prevAppData.sections[sectionIndex].name = e.target.value;
            return {...prevAppData, sections: prevAppData.sections};
        })
    }

    return (
        <div className="section-card" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <input
                className="section-card--title"
                type="text"
                value={sectionData.name}
                // ref={inputField}
                onChange={(e) => handleChange(e)}
                // style={lyricStyle}
                maxLength={100}
                // style={{width: `${value.length / 2.5}rem`}}
            />
            <div className="section-card--content">
                <div className="section-card--content__lyrics">
                    <ul>{lyricElements}</ul>
                    {isHover &&
                        <button
                            ref={addButton}
                            className="section-card--content__add svg-button"
                            onClick={async (e) => {
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                                updateRandomLyric()
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

// const [position, setPosition] = useState({ oldPosition: 0, newPosition: 0 });

// function getChangedPos(oldPosition: number, newPosition: number) {
//   console.log("change");
//   setPosition({ oldPosition: oldPosition, newPosition: newPosition });
// }
