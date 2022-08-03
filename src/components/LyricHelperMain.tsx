import {useAppData} from "../AppContext";
import {AppData, SectionData} from "../utils/interfaces";
import SectionCard from "./section/SectionCard";
import React, {useEffect, useState} from "react";
import {useAddSection} from "./sectionFunctions";

export default function LyricHelperMain() {
    const {appData, setAppData} = useAppData();
    const [newSection, setNewSection]: any = useState('')

    useAddSection(newSection)

    function handleAddSection(event: any) {
        event.stopPropagation();
        event.preventDefault();
        let newData: SectionData = {name: 'Verse', lyrics: ['Roll the dice!'], count: 0}
        setNewSection(newData)
    }

    const sectionComponents = appData.sections.map((section: SectionData, index: number) => {
        return (
            <SectionCard
                key={`SC${index}`}
                sectionIndex={index}
            />
        );
    })

    return (
        <div className="main">
            <button onClick={(e) => handleAddSection(e)}>Add Section</button>
            {sectionComponents}
        </div>
    );
};