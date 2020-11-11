import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';


import {Game, GameMode, User} from './game.models';
import {LoadGameModesSuccess, LoadGamesSuccess, SetUser} from '@state/game.actions';
import {GAME_MODES, GAMES} from './game.data';

export class GameStateModel {
    public user: User;
    public gameModes: GameMode[];
    public games: Game[];
}

export const GAME_STATE_TOKEN = new StateToken<GameStateModel>('game');

@State<GameStateModel>({
    name: GAME_STATE_TOKEN,
    defaults: {
        user: null,
        gameModes: [],
        games: []
    }
})
@Injectable()
export class GameState {

    @Selector([GAME_STATE_TOKEN])
    public static user(state: GameStateModel) {
        return state.user;
    }

    @Selector([GAME_STATE_TOKEN])
    public static gameModes(state: GameStateModel): GameMode[] {
        return state.gameModes;
    }

    @Selector([GAME_STATE_TOKEN])
    public static games(state: GameStateModel): Game[] {
        return state.games;
    }

    constructor() {
    }

    ngxsOnInit(ctx: StateContext<GameStateModel>) {
        ctx.dispatch(new LoadGameModesSuccess(GAME_MODES));
        ctx.dispatch(new LoadGamesSuccess(GAMES));
    }

    @Action(SetUser)
    setUser(ctx: StateContext<GameStateModel>, action: SetUser) {
        const state = ctx.getState();
        ctx.patchState({
            user: action.user
        });
    }

    @Action(LoadGameModesSuccess)
    loadGameModeSuccess(ctx: StateContext<GameStateModel>, action: LoadGameModesSuccess) {
        ctx.patchState({gameModes: action.gameModes});
    }

    @Action(LoadGamesSuccess)
    loadGamesSuccess(ctx: StateContext<GameStateModel>, action: LoadGamesSuccess) {
        ctx.patchState({games: action.games});
    }

}

