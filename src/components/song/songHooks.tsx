import {SongData, SectionData} from "../../utils/interfaces";
import {useSongData} from "../../context/SongContext";
import {useEffect, useState} from "react";

export function useAddSection(newSection: SectionData) {
    const {songData, setSongData} = useSongData();

    useEffect(() => {
        if (newSection) {
            setSongData((prev: SongData) => {
                prev.sections = [...prev.sections, newSection];
                return {...prev, sections: prev.sections};
            })
        }
    }, [newSection])
}