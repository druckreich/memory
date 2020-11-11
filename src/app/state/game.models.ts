import {Observable} from 'rxjs';

export enum StoneState {
    flipped = 'flipped',
    unflipped = 'unflipped',
    found = 'found'
}

export interface Stone {
    id?: string;
    setId?: string;
    setSize?: number;
    icon?: string;
    state?: StoneState;
    disabled?: boolean;
    flipped?: boolean;
    found?: boolean;
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
}

export interface Game {
    id: string;
    label: string;
    gameMode: GameMode;

    /**
     * Defines the source of the memory image
     */
    source: DataSource;
    setNumber: number;
    setSize: number;
    rows?: number[];
}

export interface DataSource {
    images?: string;
    numbers?: any;
}

export interface Highscore {
    id?: string;
    username?: string;
    score: number;
}

export interface GameStats {
    started?: number;
    completed?: number;
    moves?: number;
}

export interface User {
    id?: string;
    username: string;
    password: string;
}

export interface HighscoreModalProps {
    game: GameMode;
    localHighscore$?: Promise<Highscore>;
    highscore$?: Observable<Highscore[]>;
    showedAfterGame: boolean;
}
