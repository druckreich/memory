import {GameMode, Highscore, User} from '@state/main.models';
import {StateContext} from '@ngxs/store';
import {MainStateModel} from '@state/main.state';

export class SetUser {
    static readonly type = '[Main] Set Username';

    constructor(public user: User) {
    }

    execute(ctx: StateContext<MainStateModel>, action: SetUser) {
        const state = ctx.getState();
        ctx.setState({
            user: action.user
        });
    }
}

export class SetHighscore {
    static readonly type = '[Main] Set Highscore';

    constructor(public gameMode: GameMode, public highscore: Highscore) {
    }
}
