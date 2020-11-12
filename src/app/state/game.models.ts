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

    /**
     * Id
     */
    id: string;

    /**
     * A name or label for the game
     */
    label: string;

    /**
     * Which game mode is used
     */
    gameMode: GameMode;

    /**
     * Defines the source of the memory image
     */
    source: DataSource;

    /**
     * Defines the matrix for the memory game
     */
    rows?: number[];
}

export interface DataSource {
    images?: DataSourceComposition;
    numbers?: DataSourceComposition;
}

export interface DataSourceComposition {
    source: any;
    composition: number[];
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
