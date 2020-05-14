import {Component} from '@angular/core';
import {Select, Store} from "@ngxs/store";

import {Observable} from "rxjs";
import {Navigate} from "@ngxs/router-plugin";
import {GameMode, GameModeWithHighscore} from "../state/main.models";
import {MainState} from "../state/main.state";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    @Select(MainState.gamesWithHighscore)
    games$: Observable<GameModeWithHighscore[]>;

    constructor(public store: Store) {
    }

    onClick(game: GameMode) {
        this.store.dispatch(new Navigate(['/game', game.id]));
    }
}
