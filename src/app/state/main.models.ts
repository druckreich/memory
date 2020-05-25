export interface Stone {
    id?: string;
    setId?: string;
    setSize: number;
    icon?: string;
    state?: 'flipped'|'unflipped'|'found';

    /**
     * is in the game and can be clicked
     */
    isValid: boolean;
}

export interface GameModeWithHighscore extends GameMode {
    highscore: Highscore
}

export interface GameMode {
    id: string;
    setNumber: number;
    setSize: number;
}

export interface Highscore {
    game_id: string;
    highscore: number;
}

export const GAME_MODES: GameMode[] = [
    {id: 'normal_small', setNumber: 6, setSize: 2},
    {id: 'normal_medium', setNumber: 8, setSize: 2},
    {id: 'normal_large', setNumber: 10, setSize: 2}
];
