import {Navigate} from '@ngxs/router-plugin';
import {StateContext} from '@ngxs/store';
import {NavigationStateModel} from '@state/navigation.state';

export class GoToHome {
    static readonly type = '[Navigation] GoToHome';

    constructor() {
    }

    public execute({dispatch}: StateContext<NavigationStateModel>, action: GoToHome) {
        dispatch(new Navigate(['home']));
    }
}

export class GoToGame {
    static readonly type = '[Navigation] GoToGame';

    constructor(public gameId: string) {
    }

    public execute({dispatch}: StateContext<NavigationStateModel>, action: GoToGame) {
        dispatch(new Navigate(['game', action.gameId]));

    }
}
