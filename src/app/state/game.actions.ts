import {Game, GameMode, Highscore} from '@state/game.models';

export class LoadGameModesSuccess {
    static readonly type = 'loadGameModeSuccess';

    constructor(public gameModes: GameMode[]) {
    }
}

export class LoadGamesSuccess {
    static readonly type = 'loadGamesSuccess';

    constructor(public games: Game[]) {
    }
}

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
