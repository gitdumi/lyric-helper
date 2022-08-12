import {useContext, createContext, useState} from "react";
import {SongData} from "../utils/interfaces";
import {getNewKey} from "../utils/utils";
import {COLORS} from "../utils/constants";

const initialData: SongData = {
    id: 'new',
    title: 'New song',
    sections: [
        {
            id: getNewKey(),
            name: 'Verse',
            color: COLORS.GREEN,
            lyrics: [{id: getNewKey(), value:"To be or not to be"}, {id: getNewKey(), value:"That is the question"}],
            count: 0,
        },
        {
            id: getNewKey(),
            name: 'Chorus',
            color: COLORS.BLUE,
            lyrics: [{id: getNewKey(), value:"Oppa Gangnam Style"}, {id: getNewKey(), value:"Oppa Gangnam Style"}, {id: getNewKey(), value:"Oppa Gangnam Style"}],
            count: 0,
        },
        {
            id: getNewKey(),
            name: 'Verse 2',
            color: COLORS.GREEN,
            lyrics: [{id: getNewKey(), value:"To be or not to be, again"}, {id: getNewKey(), value:"That is the question, again"}],
            count: 0,
        }
    ],
    config: {
        selectedSylCount: 8,
        longestSylCount: 0,
    },
};

const SongContext = createContext(initialData);

export const SongContextProvider = ({children}: any) => {
    const [songData, setSongData] = useState<SongData>(initialData);

    return (
        // @ts-ignore
        <SongContext.Provider value={{songData, setSongData}}>
            {children}
        </SongContext.Provider>
    );
};

export const useSongData = () => {
    // @ts-ignore
    const {songData, setSongData} = useContext<SongData>(SongContext);
    return {songData, setSongData};
};
