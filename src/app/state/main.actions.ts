import {GameMode, Highscore} from '@state/main.models';

export class SetUsername {
    static readonly type = '[Main] Set Username';

    constructor(public username: string) {
    }
}

export class SetHighscore {
    static readonly type = '[Main] Set Highscore';

    constructor(public gameMode: GameMode, public highscore: Highscore) {
    }
}
