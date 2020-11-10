import {Game, GameMode} from '@state/main.models';

export const GAME_MODES: GameMode[] = [
    {
        id: 'standard',
        label: 'Memory - Images',
        description: 'Versuche möglichst schnell alle Bilderpaare zu finden'
    }
];

export const GAMES: Game[] = [
    {
        id: 'easy',
        label: 'easy',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 6,
        setSize: 2,
        rows: [3, 3, 3, 3]
    },
    {
        id: 'normal',
        label: 'normal',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 8,
        setSize: 2,
        rows: [4, 4, 4, 4]
    },
    {
        id: 'hard',
        label: 'hard',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 10,
        setSize: 2,
        rows: [4, 4, 4, 4, 4]
    },
    {
        id: 'hell',
        label: 'hell',
        gameMode: GAME_MODES.find((gm: GameMode) => gm.id === GAME_MODES[0].id),
        description: '',
        setNumber: 14,
        setSize: 2,
        rows: [4, 5, 5, 5, 5, 4]
    }
];


