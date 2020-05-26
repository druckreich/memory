import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';
import {Navigate} from '@ngxs/router-plugin';
import {GameMode, GameModeWithHighscore} from '@state/main.models';
import {MainState} from '@state/main.state';
import {FirebaseService} from '@state/firebase.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    @Select(MainState.gamesWithHighscore)
    games$: Observable<GameModeWithHighscore[]>;

    constructor(public store: Store, public firebaseService: FirebaseService) {
        this.firebaseService.getUsers().subscribe((users: any) => {
            const data = users.map(e => {
                return {
                    id: e.payload.doc.id,
                    ...e.payload.doc.data()
                };
            });
            console.log(data);
        });
    }

    onClick(game: GameMode) {
        this.store.dispatch(new Navigate(['/game', game.id]));
    }
}
