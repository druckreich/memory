import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UpdateHighscore} from "./main.actions";
import {patch, updateItem} from "@ngxs/store/operators";
import {GAME_MODES, GameMode, GameModeWithHighscore, Highscore} from "./main.models";

export class MainStateModel {
    public highscores: Highscore[];
}

@State<MainStateModel>({
    name: 'main'
})
@Injectable()
export class MainState {

    @Selector()
    static gamesWithHighscore(state: MainStateModel): GameModeWithHighscore[] {
        const games: GameMode[] = GAME_MODES;
        return games.map((game: GameMode) => {
            return <GameModeWithHighscore>{
                ...game,
                highscore: state.highscores.find((highscore: Highscore) => highscore.game_id == game.id)
            }
        });
    }

    ngxsOnInit(ctx: StateContext<MainStateModel>) {
        let highscores: Highscore[] = GAME_MODES.map((game: GameMode) => ({game_id: game.id, highscore: 0}));
        ctx.setState({highscores: highscores});
    }

    @Action(UpdateHighscore)
    updateHighscore(ctx: StateContext<MainStateModel>, action: UpdateHighscore) {
        const state = ctx.getState();
        ctx.setState(
            patch({
                highscores: updateItem((item: Highscore) => item.game_id === action.gameMode.id, patch({highscore: action.highscore}))
            }))
    }
}
