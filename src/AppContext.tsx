import {useContext, createContext, useState} from "react";
import {AppData} from "./utils/interfaces";
import {getNewKey} from "./utils/utils";
import {COLORS} from "./utils/constants";

const initialData: AppData = {
    title: 'New song',
    sections: [
        {
            id: getNewKey(),
            name: 'Verse',
            color: COLORS.GREEN,
            lyrics: [{id: getNewKey(), value:"To be or not to be"}],
            count: 0,
        },
    ],
    config: {
        selectedSylCount: 8,
        longestSylCount: 0,
    },
};

const AppContext = createContext(initialData);

export const AppContextProvider = ({children}: any) => {
    const [appData, setAppData] = useState<AppData>(initialData);

    return (
        // @ts-ignore
        <AppContext.Provider value={{appData, setAppData}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppData = () => {
    // @ts-ignore
    const {appData, setAppData} = useContext<AppData>(AppContext);
    return {appData, setAppData};
};
