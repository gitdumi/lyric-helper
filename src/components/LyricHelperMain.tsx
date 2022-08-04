import {useAppData} from "../AppContext";
import {AppData, SectionData} from "../utils/interfaces";
import SectionCard from "./section/SectionCard";
import React, {useEffect, useState} from "react";
import {useAddSection} from "./sectionHooks";

export default function LyricHelperMain() {
    const {appData, setAppData} = useAppData();
    const [newSection, setNewSection]: any = useState('')

    useAddSection(newSection)

    function handleAddSection(event: any) {
        event.stopPropagation();
        event.preventDefault();
        let newData: SectionData = {name: 'Verse', color: '#1adebb', lyrics: ['Roll the dice!'], count: 0}
        setNewSection(newData)
    }

    function handleDuplicateSection(event: any, sectionIndex: number) {
        event.stopPropagation();
        event.preventDefault();
        let duplicate: SectionData = {...appData.sections[sectionIndex]};
        console.log(duplicate)
        setNewSection(duplicate);
    }

    function handleDeleteSection(event: any, sectionIndex: number) {
        event.preventDefault();
        event.stopPropagation();
        setAppData((prev: AppData) => {
            prev.sections = prev.sections.filter((section: SectionData, index: number) => index != sectionIndex)
            return {...prev, sections: prev.sections}
        })
    }

    const sectionComponents = appData.sections.map((section: SectionData, index: number) => {
        return (
            <SectionCard
                key={`SC${section.name}`}
                sectionIndex={index}
                handleDuplicate={handleDuplicateSection}
                handleDelete={handleDeleteSection}
            />
        );
    })

    return (
        <div className="main">
            <button onClick={(e) => handleAddSection(e)}>Add Section</button>
            {sectionComponents}
        </div>
    )
};