import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';


import {User} from './game.models';
import {GameStateModel} from '@state/game.state';
import {SetUser} from '@state/auth.action';

export class AuthStateModel {
    public user: User;

}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State<AuthStateModel>({
    name: AUTH_STATE_TOKEN,
    defaults: {
        user: null,
    }
})
@Injectable()
export class AuthState {

    @Selector([AUTH_STATE_TOKEN])
    public static user(state: AuthStateModel) {
        return state.user;
    }

    constructor() {
    }

    ngxsOnInit(ctx: StateContext<GameStateModel>) {
    }

    @Action(SetUser)
    setUser(ctx: StateContext<AuthStateModel>, action: SetUser) {
        ctx.patchState({
            user: action.user
        });
    }
}

