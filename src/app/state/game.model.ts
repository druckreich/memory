import {GameMode} from '@state/main.models';

export const GAME_MODES: GameMode[] = [
    {
        id: 'normal_test',
        label: 'Playground',
        description: '',
        setNumber: 2,
        setSize: 2,
        released: true,
        locked: false,
        rows: [2, 2]
    },
    {
        id: 'normal_one',
        label: 'normal_one',
        description: '',
        setNumber: 4,
        setSize: 2,
        released: true,
        locked: false,
        rows: [2, 2, 2, 2]
    },
    {
        id: 'normal_two',
        label: 'normal_two',
        description: '',
        setNumber: 5,
        setSize: 2,
        released: true,
        locked: false,
        rows: [3, 4, 3]
    },
    {
        id: 'normal_three',
        label: 'normal_three',
        description: '',
        setNumber: 6,
        setSize: 2,
        released: true,
        locked: false,
        rows: [2, 3, 2, 3, 2]
    },
    {
        id: 'normal_four',
        label: 'normal_four',
        description: '',
        setNumber: 7,
        setSize: 2,
        released: true,
        locked: true,
        rows: [3, 4, 4, 3]
    },
    {
        id: 'normal_five',
        label: 'normal_five',
        description: '',
        setNumber: 8,
        setSize: 2,
        released: true,
        locked: true,
        rows: [1, 2, 3, 4, 3, 2, 1]
    },
    {
        id: 'normal_six',
        label: 'normal_six',
        description: '',
        setNumber: 9,
        setSize: 2,
        released: true,
        locked: true,
        rows: [3, 4, 4, 4, 3]
    }
];
