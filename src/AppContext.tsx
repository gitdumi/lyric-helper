import { useContext, createContext, useState } from "react";
import { AppData } from "./utils/interfaces";

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

const AppContext = createContext<[AppData, any]>(initialData);

export const AppContextProvider = ({ children }: any) => {
  const [appData, setAppData] = useState<AppData>(initialData);

  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = () => {
  const { appData, setAppData } = useContext(AppContext);
  return { appData, setAppData };
};
