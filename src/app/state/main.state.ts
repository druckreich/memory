import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {SetUser} from '@state/main.actions';

import {User} from '@state/main.models';

export class MainStateModel {
    public user: User;
}

@State<MainStateModel>({
    name: 'main'
})
@Injectable()
export class MainState {

    @Selector()
    public static user(state: MainStateModel) {
        return state.user;
    }


    @Selector()
    public static username(state: MainStateModel) {
        return state.user.username;
    }

    constructor() {
    }

    ngxsOnInit(ctx: StateContext<MainStateModel>) {
    }

    @Action(SetUser)
    setUsername(ctx: StateContext<MainStateModel>, action: SetUser) {
        const state = ctx.getState();
        ctx.setState({
            user: action.user
        });
    }
}

