import {useAppData} from "../AppContext";
import {AppData, SectionData} from "../utils/interfaces";
import SectionCard from "./section/SectionCard";
import React, {useEffect, useState} from "react";
import {useAddSection} from "./sectionHooks";
import {getNewKey} from "../utils/utils";

export default function LyricHelperMain() {
    const {appData, setAppData} = useAppData();
    const [newSection, setNewSection]: any = useState('')

    useAddSection(newSection)

    function handleAddSection(event: any) {
        event.stopPropagation();
        event.preventDefault();
        let newData: SectionData = {
            id: getNewKey(),
            name: 'Verse',
            color: '#1adebb',
            lyrics: ['Roll the dice!'],
            count: 0
        }
        setNewSection(newData)
    }

    function handleDuplicateSection(event: any, sectionIndex: number) {
        event.stopPropagation();
        event.preventDefault();
        let duplicate: SectionData = {...appData.sections[sectionIndex]};
        duplicate.id = getNewKey();
        console.log(duplicate);
        setNewSection(duplicate);
    }

    function handleDeleteSection(event: any, sectionId: string) {
        event.preventDefault();
        event.stopPropagation();
        setAppData((prev: AppData) => {
            console.log('sections before delete',prev.sections)
            prev.sections = prev.sections.filter((section: SectionData) => section.id != sectionId)
            console.log('sections after delete',prev.sections)
            return {...prev, sections: prev.sections}
        })
    }

    const sectionComponents = appData.sections.map((section: SectionData, index: number) => {
        return (
            <SectionCard
                key={`SC-${section.id}`}
                sectionIndex={index}
                sectionId={section.id}
                handleDuplicate={handleDuplicateSection}
                handleDelete={handleDeleteSection}
            />
        );
    })

    return (
        <div className="main">
            <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddSection(e);
            }}>Add Section
            </button>
            {sectionComponents}
        </div>
    )
};