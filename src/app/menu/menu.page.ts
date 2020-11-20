import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameMode} from '@state/game.models';
import {GameFacade} from '@state/game.facade';
import {Select} from '@ngxs/store';
import {GameState} from '@state/game.state';
import {Observable} from 'rxjs';
import {FirebaseService} from '@state/firebase.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuPage {


    public gameModes: GameMode[] = this.gameFacade.gameModes;

    rows: number[] = [1, 2, 3, 4];

    constructor(public gameFacade: GameFacade, private firebaseService: FirebaseService) {
        this.firebaseService.setUsername('smarti');
    }

    selectGameMode(gameMode: GameMode): void {
        this.gameFacade.navigateToDifficultySelect(gameMode.id);
    }
}
