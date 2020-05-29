import {GameMode} from '@state/main.models';

export const GAME_MODES: GameMode[] = [
    {
        id: 'normal_test',
        label: 'Playground',
        description: '',
        setNumber: 1,
        setSize: 2,
        released: true,
        locked: false
    },
    {
        id: 'normal_small',
        label: 'Easy',
        description: '',
        setNumber: 6,
        setSize: 2,
        released: true,
        locked: false
    },
    {
        id: 'normal_medium',
        label: 'Medium',
        description: '',
        setNumber: 8,
        setSize: 2,
        released: true,
        locked: true
    },
    {
        id: 'normal_large',
        label: 'Hard',
        description: '',
        setNumber: 10,
        setSize: 2,
        released: true,
        locked: true
    },
    {
        id: 'normal_xlarge',
        label: 'Brutal',
        description: '',
        setNumber: 15,
        setSize: 2,
        released: true,
        locked: true
    }
];
