import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {SetHighscore, SetUsername} from '@state/main.actions';
import {FirebaseService} from '@state/firebase.service';

export class MainStateModel {
    public username: string;
}

@State<MainStateModel>({
    name: 'main'
})
@Injectable()
export class MainState {

    @Selector()
    public static username(state: MainStateModel) {
        return state.username;
    }

    constructor(public firebaseService: FirebaseService) {
    }

    ngxsOnInit(ctx: StateContext<MainStateModel>) {
    }

    @Action(SetUsername)
    setUsername(ctx: StateContext<MainStateModel>, action: SetUsername) {
        const state = ctx.getState();
        ctx.setState({
            username: action.username
        });
    }

    @Action(SetHighscore)
    setHighscore(ctx: StateContext<MainStateModel>, action: SetHighscore) {
        this.firebaseService.setHighscore(action.gameMode.id, action.highscore);
    }

}

