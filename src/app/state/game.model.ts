import {Game, GameMode} from '@state/main.models';

export const GAME_MODES: GameMode[] = [
    {
        id: 'standard',
        label: 'Bilder Memory',
        description: 'Versuche möglichst schnell alle Bilderpaare zu finden'
    }
];

export const GAMES: Game[] = [
    {
        id: 'easy',
        label: 'easy',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 4,
        setSize: 2,
        rows: [1, 2, 2, 2, 1]
    },
    {
        id: 'normal',
        label: 'normal',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 6,
        setSize: 2,
        rows: [3, 3, 3, 3]
    },
    {
        id: 'hard',
        label: 'hard',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 9,
        setSize: 2,
        rows: [2, 3, 4, 4, 3, 2]
    },
    {
        id: 'nightmare',
        label: 'nightmare',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 12,
        setSize: 2,
        rows: [3, 4, 5, 5, 4, 3]
    },
    {
        id: 'hell',
        label: 'hell',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 15,
        setSize: 2,
        rows: [3, 4, 5, 6, 5, 4, 3]
    },
    {
        id: 'insane',
        label: 'insane',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 18,
        setSize: 2,
        rows: [4, 5, 6, 6, 6, 5, 4]
    },
    {
        id: 'horror',
        label: 'horror',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 21,
        setSize: 2,
        rows: [6, 6, 6, 6, 6, 6, 6]
    },
    {
        id: 'madness',
        label: 'madness',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 24,
        setSize: 2,
        rows: [6, 6, 6, 6, 6, 6, 6, 6]
    }
];


