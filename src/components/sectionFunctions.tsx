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

// export function useInputUpdate(sectionIndex: number, index: number, event: any) {
//     const {appData, setAppData} = useAppData();
//
//     function handleChange(event: any) {
//         setAppData((prevAppData: AppData) => {
//             prevAppData.sections[sectionIndex].lyrics[index] = event.target.value;
//             return {...prevAppData, sections: prevAppData.sections};
//         })
//     }
// }