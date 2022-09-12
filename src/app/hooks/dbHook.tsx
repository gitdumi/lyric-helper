import { useEffect, useState } from 'react';
import { INITIAL_SYL_COUNT } from '../../utils/constants';
import {
  addLyricGroupPerSyl,
  selectCurrentSylCount,
  selectDbLyrics,
  setCurrent
} from '../store/dbSlice';
import { useDispatch, useSelector } from 'react-redux';
import { readLyricsDb } from '../../service/firebaseDb';

const useLyricDb = () => {
  const dispatch = useDispatch();
  const current = useSelector(selectCurrentSylCount);
  const db = useSelector(selectDbLyrics);

  function setCurrentSylCount(sylCount: number) {
    if (!!sylCount && !Object.keys(db).includes(`${sylCount}`) && sylCount != current) {
      readLyricsDb(sylCount).then((result) => {
        dispatch(addLyricGroupPerSyl({ content: result, sylCount: sylCount }));
      });
    }
    dispatch(setCurrent(sylCount));
  }

  useEffect(() => {
    if (!db?.lyrics) {
      readLyricsDb(INITIAL_SYL_COUNT).then((result) => {
        dispatch(addLyricGroupPerSyl({ content: result, sylCount: INITIAL_SYL_COUNT }));
      });
    }
  }, []);

  return { db, setCurrentSylCount };
};

export default useLyricDb;
