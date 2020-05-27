export enum StoneState {
    flipped = 'flipped',
    unflipped = 'unflipped',
    found = 'found'
}

export interface Stone {
    id?: string;
    setId?: string;
    setSize: number;
    icon?: string;
    state?: StoneState;
    disabled: boolean;
}

export interface GameModeWithHighscore extends GameMode {
    highscore: Highscore;
}

export interface GameMode {
    id: string;
    label: string;
    description: string;
    setNumber: number;
    setSize: number;
    cols: number;
    rows: number;
}

export interface Highscore {
    id?: string;
    user?: string;
    score: number;
}

export interface User {
    id?: string;
    username: string;
    password: string;
}

export const GAME_MODES: GameMode[] = [
    {id: 'normal_test', label: 'Playground', description: '', setNumber: 1, setSize: 2, cols: 2, rows: 1},
    {id: 'normal_small', label: 'Beginner', description: '', setNumber: 6, setSize: 2, cols: 3, rows: 4},
    {id: 'normal_medium', label: 'Showoff', description: '', setNumber: 8, setSize: 2, cols: 4, rows: 4},
    {id: 'normal_large', label: 'Sensai', description: '', setNumber: 10, setSize: 2, cols: 4, rows: 5}
];
