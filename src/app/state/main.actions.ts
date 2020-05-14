import {GameMode} from "./main.models";

export class UpdateHighscore {
    static readonly type = '[Main] Set Highscore';

    constructor(public gameMode: GameMode, public highscore: number) {
    }
}
