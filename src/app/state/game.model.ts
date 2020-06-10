import {Game, GameMode} from '@state/main.models';

export const GAME_MODES: GameMode[] = [
    {
        id: 'autumn',
        label: 'Ein freundliche Spiel Memory',
        description: 'Ein freundliche Spiel Memory'
    }
];

export const GAMES: Game[] = [
    {
        id: 'autumn_easy',
        label: 'autumn_easy',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === 'autumn'),
        description: '',
        setNumber: 4,
        setSize: 2,
        rows: [1, 2, 2, 2, 1]
    },
    {
        id: 'autumn_normal',
        label: 'autumn_normal',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === 'autumn'),
        description: '',
        setNumber: 6,
        setSize: 2,
        rows: [3, 3, 3, 3]
    },
    {
        id: 'autumn_hard',
        label: 'autumn_hard',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === 'autumn'),
        description: '',
        setNumber: 9,
        setSize: 2,
        rows: [2, 3, 4, 4, 3, 2]
    },
    {
        id: 'autumn_nightmare',
        label: 'autumn_nightmare',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === 'autumn'),
        description: '',
        setNumber: 12,
        setSize: 2,
        rows: [3, 4, 5, 5, 4, 3]
    },
    {
        id: 'autumn_hell',
        label: 'autumn_hell',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === 'autumn'),
        description: '',
        setNumber: 15,
        setSize: 2,
        rows: [3, 4, 5, 6, 5, 4, 3]
    },
    {
        id: 'autumn_insane',
        label: 'autumn_insane',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === 'autumn'),
        description: '',
        setNumber: 18,
        setSize: 2,
        rows: [4, 5, 6, 6, 6, 5, 4]
    },
    {
        id: 'autumn_horror',
        label: 'autumn_horror',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === 'autumn'),
        description: '',
        setNumber: 21,
        setSize: 2,
        rows: [6, 6, 6, 6, 6, 6, 6]
    },
    {
        id: 'autumn_madness',
        label: 'autumn_madness',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === 'autumn'),
        description: '',
        setNumber: 24,
        setSize: 2,
        rows: [6, 6, 6, 6, 6, 6, 6, 6]
    }
];


