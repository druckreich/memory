import {Observable} from 'rxjs';

export enum GameType {
    image = 'image',
    number = 'number'
}

export enum StoneAnimationState {
    flipped = 'flipped',
    unflipped = 'unflipped',
    found = 'found'
}

export enum StoneType {
    image,
    number
}


export interface Stone {

    // unique id for this stone
    id: string;

    // how many items are in this set
    setSize: number;

    // what kind of set does this stone belong to
    setType: GameType;

    // the value that is shown on a stone can be a value or a link
    value: string;

    // key to unlock this set - used to validate the stone with other stones
    // image need the same key
    // number need the sum be the key
    key: string;

    // state of the stone - used for the runtime game animation
    state?: StoneAnimationState;

    // can not be tabbed
    disabled?: boolean;

    // is flipped
    flipped?: boolean;

    // is found
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
    type: GameType;
    label: string;
    description: string;
    enabled: boolean;
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

    elementsPerSet: number;

    numberOfSets: number;

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
}

export interface Highscore {
    id?: string;
    username?: string;
    time: number;
    moves: number;
}

export interface GameStats {
    started?: number;
    completed?: number;
}

export interface HighscoreModalProps {
    game: Game;
    time: number;
    moves: number;
}
