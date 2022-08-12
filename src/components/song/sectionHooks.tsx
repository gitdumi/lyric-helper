import {SongData, SectionData} from "../../utils/interfaces";
import {useSongData} from "../../context/SongContext";
import {useEffect} from "react";
import {getNewKey} from "../../utils/utils";
import {COLORS} from "../../utils/constants";

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
