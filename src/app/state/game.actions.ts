
import {StateContext} from '@ngxs/store';
import {GameStateModel} from '@state/game.state';
import {Game, GameMode, Highscore, User} from '@state/game.models';

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
