import {GameMode, Highscore, User} from '@state/main.models';

export class SetUser {
    static readonly type = '[Main] Set Username';

    constructor(public user: User) {
    }
}

export class SetHighscore {
    static readonly type = '[Main] Set Highscore';

    constructor(public gameMode: GameMode, public highscore: Highscore) {
    }
}
