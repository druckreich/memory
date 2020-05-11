import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {UpdateHighscore} from "./main.actions";
import {patch, updateItem} from "@ngxs/store/operators";

export interface GameMode {
    id: string;
    setNumber: number;
    setSize: number;
    highscore?: number;
}

export class MainStateModel {
    public games: GameMode[];
}

const defaults = {
    games: <GameMode[]>[
        {id: 'normal_small', setNumber: 6, setSize: 2, highscore: 0},
        {id: 'normal_medium', setNumber: 8, setSize: 2, highscore: 0},
        {id: 'normal_large', setNumber: 10, setSize: 2, highscore: 0}
    ]
};

@State<MainStateModel>({
    name: 'main',
    defaults
})
@Injectable()
export class MainState {
    @Action(UpdateHighscore)
    updateHighscore(ctx: StateContext<MainStateModel>, action: UpdateHighscore) {
        const state = ctx.getState();
        ctx.setState(
            patch({
                games: updateItem((item: GameMode) => item.id === action.gameMode.id, patch({highscore: action.highscore}))
            }))
    }
}
