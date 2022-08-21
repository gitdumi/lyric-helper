import { useContext, createContext, useState } from 'react';
import { getNewSong } from './InitData';
import React from 'react';

const SongContext = createContext(getNewSong);

export const SongContextProvider = ({ children }: any) => {
  const [songData, setSongData] = useState(getNewSong);

  // @ts-ignore
  return <SongContext.Provider value={{ songData, setSongData }}>{children}</SongContext.Provider>;
};

export const useSongData = () => {
  // @ts-ignore
  const { songData, setSongData } = useContext<SongData>(SongContext);
  return { songData, setSongData };
};
