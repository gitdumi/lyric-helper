import {useCallback, useContext, useEffect, useRef, useState, useMemo} from "react";
import SectionLyric from "./SectionLyric";
import {addIconSvg} from "../assets/svg/svg";
import {AppData, SectionData} from "../utils/interfaces";
import {useAppData} from "../AppContext";
import {getLyric} from "../utils/hipster";

export default function SectionCard(props: { sectionIndex: number }) {
    const {appData, setAppData} = useAppData();
    const {sectionIndex} = props;
    const sectionData = appData.sections[sectionIndex];
    const {lyrics, count} = sectionData;
    const [randomLyric, setRandomLyric] = useState('');

    const addButton = useRef(null);

    useEffect(()=> {
        setAppData((prev: AppData) => {
            prev.sections[sectionIndex].lyrics = [
                ...sectionData.lyrics,
                randomLyric,
            ];
            console.log(prev.sections[sectionIndex], 'mama')
            console.log("append new lyric");
            return {...prev, sections: prev.sections};
        });
    }, [randomLyric])

    function updateRandomLyric() {
        getLyric((appData.config.selectedSylCount)).then(result => setRandomLyric(result.lyric))
    }

    const lyricElements = lyrics.map((text: string, index: number) => {
        return (
            <SectionLyric
                key={`SL${index}`}
                sectionIndex={sectionIndex}
                index={index}
                value={text}
                // removeLyric={removeLyric}
            />
        );
    });

    return (
        <div className="section-card">
            <div className="section-card--title">Chorus</div>
            <div className="section-card--content">
                <div className="section-card--content__lyrics">
                    <ul>{lyricElements}</ul>
                    <button
                        ref={addButton}
                        className="section-card--content__add svg-button"
                        onClick={async (e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            console.log(e)

                            console.log("parent click");
                            updateRandomLyric()
                        }}
                    >
                        {addIconSvg}
                    </button>
                </div>
                <div className="section-card--actions">
                    <button>duplicate</button>
                    <button>move</button>
                    <button>delete</button>
                </div>
            </div>
            <div className="section-duplicate">
                <button>duplicate section</button>
            </div>
        </div>
    );
}

// const [position, setPosition] = useState({ oldPosition: 0, newPosition: 0 });

// function getChangedPos(oldPosition: number, newPosition: number) {
//   console.log("change");
//   setPosition({ oldPosition: oldPosition, newPosition: newPosition });
// }
