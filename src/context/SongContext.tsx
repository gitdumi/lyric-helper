import { useContext, createContext, useState } from 'react';
import { SongData } from '../utils/interfaces';
import { NEW_SONG } from './InitData';

const SongContext = createContext(NEW_SONG);

export const SongContextProvider = ({ children }: any) => {
  const [songData, setSongData] = useState(NEW_SONG);

  return (
    // @ts-ignore
    <SongContext.Provider value={{ songData, setSongData }}>{children}</SongContext.Provider>
  );
};

export const useSongData = () => {
  // @ts-ignore
  const { songData, setSongData } = useContext<SongData>(SongContext);
  return { songData, setSongData };
};
