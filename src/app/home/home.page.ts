import {Component} from '@angular/core';
import {Store} from "@ngxs/store";
import {GameMode} from "../state/main.state";
import {Observable} from "rxjs";
import {Navigate} from "@ngxs/router-plugin";
import {UpdateHighscore} from "../state/main.actions";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    games$: Observable<GameMode[]> = this.store.select(s => s.main.games);

    constructor(public store: Store) {
    }

    startGame(game: GameMode) {
        this.store.dispatch(new UpdateHighscore(game, 10));
        //this.store.dispatch(new Navigate(['/game', game.id]));
    }

}
