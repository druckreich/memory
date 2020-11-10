import {Game, GameMode} from '@state/main.models';

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
        description: '',
        setNumber: 6,
        setSize: 2,
        rows: [3, 3, 3, 3]
    },
    {
        id: 'normal',
        label: 'normal',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        description: '',
        setNumber: 8,
        setSize: 2,
        rows: [4, 4, 4, 4]
    },
    {
        id: 'hard',
        label: 'hard',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        description: '',
        setNumber: 10,
        setSize: 2,
        rows: [4, 4, 4, 4, 4]
    },
    {
        id: 'insanse',
        label: 'insanse',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        description: '',
        setNumber: 5,
        setSize: 3,
        rows: [3, 3, 3, 3, 3]
    },
    {
        id: 'wtf',
        label: 'wtf',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        description: '',
        setNumber: 6,
        setSize: 3,
        rows: [3, 4, 4, 4, 3]
    },
    {
        id: 'god',
        label: 'god',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.images),
        description: '',
        setNumber: 5,
        setSize: 4,
        rows: [4, 4, 4, 4, 4]
    },
    {
        id: 'easy',
        label: 'number Too easy ...',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODE_IDS.number),
        description: '',
        setNumber: 6,
        setSize: 2,
        rows: [3, 3, 3, 3]
    },
];


