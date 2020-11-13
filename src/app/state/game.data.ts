import {Game, GameMode, GameType} from './game.models';

const ZERLEGUNG_20 = [[0, 20], [1, 19], [2, 18], [3, 17], [4, 16], [5, 15], [6, 14], [7, 13], [8, 12], [9, 11], [10, 10]];

export const GAME_MODES: GameMode[] = [
    {
        id: GameType.image,
        type: GameType.image,
        label: 'Images',
        description: 'Versuche zusammengehörige Bilder zu finden'
    },
    {
        id: GameType.number,
        type: GameType.number,
        label: 'Numbers',
        description: 'Versuche zusammengehörige Zahlen zu finden'
    }
];

export const GAMES: Game[] = [
    {
        id: 'easy',
        label: 'Too easy ...',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
                composition: [2, 2],
            }
        },
        rows: [2, 2]
    },
    {
        id: 'normal',
        label: 'normal',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
                composition: [2, 2, 2, 2, 2, 2, 2, 2]
            }
        },
        rows: [4, 4, 4, 4]
    },
    {
        id: 'hard',
        label: 'hard',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
                composition: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            }
        },
        rows: [4, 4, 4, 4, 4]
    },
    {
        id: 'insanse',
        label: 'insanse',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
                composition: [3, 3, 3, 3, 3]
            }
        },
        rows: [3, 3, 3, 3, 3]
    },
    {
        id: 'wtf',
        label: 'wtf',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
                composition: [3, 3, 3, 3, 3, 3]
            }
        },
        rows: [3, 4, 4, 4, 3]
    },
    {
        id: 'god',
        label: 'god',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
                composition: [4, 4, 4, 4, 4]
            }
        },
        rows: [4, 4, 4, 4, 4]
    },
    {
        id: 'easy',
        label: 'number Too easy ...',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.number),
        source: {
            numbers: {
                source: ZERLEGUNG_20,
                composition: [2, 2, 2, 2, 2, 2]
            }
        },
        rows: [3, 3, 3, 3]
    },
    {
        id: 'easy',
        label: 'number Too easy ...',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.number),
        source: {
            numbers: {
                source: ZERLEGUNG_20,
                composition: [2, 2, 2, 2, 2, 2, 2, 2]
            }
        },
        rows: [3, 3, 3, 3]
    }
];




