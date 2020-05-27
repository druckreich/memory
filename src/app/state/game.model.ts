import {GameMode} from '@state/main.models';

export const GAME_MODES: GameMode[] = [
    {
        id: 'normal_test',
        label: 'Playground',
        description: '',
        setNumber: 1,
        setSize: 2,
        cols: 2,
        rows: 1,
        released: true,
        locked: false
    },
    {
        id: 'normal_small',
        label: 'Spring',
        description: 'The first quarter of the year',
        setNumber: 6,
        setSize: 2,
        cols: 3,
        rows: 4,
        released: true,
        locked: false
    },
    {
        id: 'normal_medium',
        label: 'Showoff',
        description: '',
        setNumber: 8,
        setSize: 2,
        cols: 4,
        rows: 4,
        released: true,
        locked: true
    },
    {
        id: 'normal_large',
        label: 'Sensai',
        description: '',
        setNumber: 10,
        setSize: 2,
        cols: 4,
        rows: 5,
        released: true,
        locked: true
    }
];
