import {SectionData, SongData} from "../utils/interfaces";
import {getNewKey} from "../utils/utils";
import {COLORS} from "../utils/constants";

export const NEW_SONG: SongData = {
    id: 'new',
    title: 'New song',
    sections: [
        {
            id: getNewKey(),
            name: 'Verse',
            color: COLORS.GREEN,
            lyrics: [{id: getNewKey(), value: "To be or not to be"}, {id: getNewKey(), value: "That is the question"}],
            count: 0,
        },
        {
            id: getNewKey(),
            name: 'Chorus',
            color: COLORS.BLUE,
            lyrics: [{id: getNewKey(), value: "Oppa Gangnam Style"}, {
                id: getNewKey(),
                value: "Oppa Gangnam Style"
            }, {id: getNewKey(), value: "Oppa Gangnam Style"}],
            count: 0,
        },
        {
            id: getNewKey(),
            name: 'Verse 2',
            color: COLORS.GREEN,
            lyrics: [{id: getNewKey(), value: "To be or not to be, again"}, {
                id: getNewKey(),
                value: "That is the question, again"
            }],
            count: 0,
        }
    ],
    config: {
        selectedSylCount: 8,
        longestSylCount: 0,
    },
}

export let NEW_SECTION: SectionData = {
    id: getNewKey(),
    name: 'Verse',
    color: COLORS.GREEN,
    lyrics: [
        {
            id: getNewKey(),
            value: 'To be or not to be'
        },
        {
            id: getNewKey(),
            value: 'That is the question'
        }],
    count: 0
}

export const SAMPLE_SONGS: SongData[] = [
    {
        id: '1',
        title: '1 doamne ajuta',
        sections: [
            {
                id: getNewKey(),
                name: '1doamne ajuta',
                color: COLORS.GREEN,
                lyrics: [{id: getNewKey(), value: "To be or not to be"}, {
                    id: getNewKey(),
                    value: "That is the question"
                }],
                count: 0,
            },
        ],
        config: {
            selectedSylCount: 8,
            longestSylCount: 0,
        }
    }, {
        id: '2',
        title: '2 doamne ajuta',
        sections: [
            {
                id: getNewKey(),
                name: '2doamne ajuta',
                color: COLORS.GREEN,
                lyrics: [{id: getNewKey(), value: "To be or not to be"}, {
                    id: getNewKey(),
                    value: "That is the question"
                }],
                count: 0,
            },
        ],
        config: {
            selectedSylCount: 8,
            longestSylCount: 0,
        }
    }, {
        id: '3',
        title: '3 doamne ajuta',
        sections: [
            {
                id: getNewKey(),
                name: '3doamne ajuta',
                color: COLORS.GREEN,
                lyrics: [{id: getNewKey(), value: "To be or not to be"}, {
                    id: getNewKey(),
                    value: "That is the question"
                }],
                count: 0,
            },
        ],
        config: {
            selectedSylCount: 8,
            longestSylCount: 0,
        },
    }
]