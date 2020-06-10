import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {SetUser} from '@state/main.actions';

import {User} from '@state/main.models';

export class MainStateModel {
    public user: User;
}

@State<MainStateModel>({
    name: 'main',
    defaults: {
        user: null
    }
})
@Injectable()
export class MainState {

    @Selector()
    public static user(state: MainStateModel) {
        return state.user;
    }

    constructor() {
    }

    ngxsOnInit(ctx: StateContext<MainStateModel>) {
    }

    @Action(SetUser)
    setUser(ctx: StateContext<MainStateModel>, action: SetUser) {
        action.execute(ctx, action);
    }
}

