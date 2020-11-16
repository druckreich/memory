import {Game, GameMode, GameType} from './game.models';

export const ZERLEGUNG_20 = 'ZERLEGUNG_20';

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
        id: 'image_double_debug',
        label: 'image_double_debug',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
            }
        },
        elementsPerSet: 2,
        numberOfSets: 2,
        rows: [2, 2]
    },
    {
        id: 'image_double_easy',
        label: 'image_double_easy',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
            }
        },
        elementsPerSet: 2,
        numberOfSets: 6,
        rows: [3, 3, 3, 3]
    },
    {
        id: 'image_double_normal',
        label: 'image_double_normal',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
            }
        },
        elementsPerSet: 2,
        numberOfSets: 8,
        rows: [4, 4, 4, 4]
    },
    {
        id: 'image_double_hard',
        label: 'image_double_hard',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
            }
        },
        elementsPerSet: 2,
        numberOfSets: 10,
        rows: [4, 4, 4, 4, 4]
    },
    {
        id: 'image_tripple_easy',
        label: 'image_tripple_easy',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
            }
        },
        elementsPerSet: 3,
        numberOfSets: 5,
        rows: [3, 3, 3, 3, 3]
    },
    {
        id: 'image_tripple_normal',
        label: 'image_tripple_normal',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
            }
        },
        elementsPerSet: 3,
        numberOfSets: 6,
        rows: [3, 4, 4, 4, 3]
    },
    {
        id: 'image_tripple_hard',
        label: 'image_tripple_hard',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
            }
        },
        elementsPerSet: 3,
        numberOfSets: 7,
        rows: [4, 4, 5, 4, 4]
    },
    {
        id: 'image_quadruple_easy',
        label: 'image_quadruple_easy',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
            }
        },
        elementsPerSet: 4,
        numberOfSets: 4,
        rows: [4, 4, 4, 4]
    },
    {
        id: 'image_quadruple_normal',
        label: 'image_quadruple_normal',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
            }
        },
        elementsPerSet: 4,
        numberOfSets: 5,
        rows: [4, 4, 4, 4, 4]
    },
    {
        id: 'image_quadruple_hard',
        label: 'image_quadruple_hard',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.image),
        source: {
            images: {
                source: 'assets/icons.json',
            }
        },
        elementsPerSet: 4,
        numberOfSets: 7,
        rows: [5, 6, 6, 6, 5]
    },
    {
        id: 'easy',
        label: 'number Too easy ...',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.number),
        source: {
            numbers: {
                source: ZERLEGUNG_20,
            }
        },
        elementsPerSet: 2,
        numberOfSets: 6,
        rows: [3, 3, 3, 3]
    },
    {
        id: 'medium',
        label: 'number Zerlegung 3',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GameType.number),
        source: {
            numbers: {
                source: ZERLEGUNG_20,
            }
        },
        elementsPerSet: 3,
        numberOfSets: 4,
        rows: [3, 3, 3, 3]
    },
];




