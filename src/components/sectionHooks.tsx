import {AppData, SectionData} from "../utils/interfaces";
import {useAppData} from "../AppContext";
import {useEffect} from "react";

export function useAddSection(newSection: SectionData) {
    const {appData, setAppData} = useAppData();

    useEffect(() => {
        if (newSection) {
            // useAddSection(newSection)
            setAppData((prev: AppData) => {
                prev.sections = [...prev.sections, newSection];
                return {...prev, sections: prev.sections};
            })
        }
    }, [newSection])
}