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
    flipped: boolean;
    found: boolean;
}

export interface StoneDimension {
    width: number;
    padding: number;
    marginBottom: number;
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
    released: boolean;
    locked: boolean;
    rows?: number[];
}

export interface Highscore {
    id?: string;
    username?: string;
    score: number;
}

export interface GameStats {
    id?: string;
    completed: number;
}

export interface User {
    id?: string;
    username: string;
    password: string;
}

export interface HighscoreModalProps {
    gameMode: GameMode;
    highscore?: Highscore;
    updateHighscore: boolean;
    gameStats?: GameStats;
    updateGameStats: boolean;
}
