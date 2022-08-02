import {useContext, createContext, useState} from "react";
import {AppData} from "./utils/interfaces";
import App from "./App";

const initialData: AppData = {
    sections: [
        {
            lyrics: ["Roll the dice!"],
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

    console.log('appcontextprovider was here')
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
