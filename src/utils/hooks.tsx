import {useEffect, useState, useContext} from "react";
import {useAppData} from "../AppContext";
import {AppData} from "./interfaces";

//////////////-------------------

// function addLyric() {
//   getLyric(8).then((result) => {
//     setSectionData((prev) => ({
//       ...prev,
//       lyrics: [...sectionData.lyrics, result.lyric],
//     }));
//   });
// }

// function removeLyric(event: Event, index: number) {
//   event.preventDefault();
//   const updatedLyrics = sectionData.lyrics.filter((lyr, i) => {
//     console.log(lyr, i);
//     return i != index;
//   });

//   console.log(index + "delete");

//   setSectionData((prev: SectionData) => {
//     return {
//       lyrics: updatedLyrics,
//       count: updatedLyrics.length - 1,
//     };
//   });
// }
