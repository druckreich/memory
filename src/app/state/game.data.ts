import {Game, GameMode} from './game.models';

export enum GAME_MODE_IDS {
    images= 'image',
    number= 'number'
}

export const GAME_MODES: GameMode[] = [
    {
        id: GAME_MODE_IDS.images,
        label: 'Images',
        description: 'Versuche zusammengehörige Bilder zu finden'
    },
    {
        id: GAME_MODE_IDS.number,
        label: 'Numbers',
        description: 'Versuche zusammengehörige Zahlen zu finden'
    }
];

export const GAMES: Game[] = [
    {
        id: 'easy',
        label: 'Too easy ...',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        source: {
            images: 'assets/icons.json'
        },
        setNumber: 6,
        setSize: 2,
        rows: [3, 3, 3, 3]
    },
    {
        id: 'normal',
        label: 'normal',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        source: {
            images: 'assets/icons.json'
        },
        setNumber: 8,
        setSize: 2,
        rows: [4, 4, 4, 4]
    },
    {
        id: 'hard',
        label: 'hard',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        source: {
            images: 'assets/icons.json'
        },
        setNumber: 10,
        setSize: 2,
        rows: [4, 4, 4, 4, 4]
    },
    {
        id: 'insanse',
        label: 'insanse',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        source: {
            images: 'assets/icons.json'
        },
        setNumber: 5,
        setSize: 3,
        rows: [3, 3, 3, 3, 3]
    },
    {
        id: 'wtf',
        label: 'wtf',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        source: {
            images: 'assets/icons.json'
        },
        setNumber: 6,
        setSize: 3,
        rows: [3, 4, 4, 4, 3]
    },
    {
        id: 'god',
        label: 'god',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        source: {
            images: 'assets/icons.json'
        },
        setNumber: 5,
        setSize: 4,
        rows: [4, 4, 4, 4, 4]
    },
    // numbers
    {
        id: 'easy',
        label: 'number Too easy ...',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.number),
        source: {
            numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        setNumber: 6,
        setSize: 2,
        rows: [3, 3, 3, 3]
    },
];


