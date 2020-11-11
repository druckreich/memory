import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameMode} from '@state/game.models';
import {GameFacade} from '@state/game.facade';
import {Select} from '@ngxs/store';
import {GameState} from '@state/game.state';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuPage {


    public gameModes: GameMode[] = this.gameFacade.gameModes;

    constructor(public gameFacade: GameFacade) {
    }

    selectGameMode(gameMode: GameMode): void {
        this.gameFacade.navigateToDifficultySelect(gameMode.id);
    }
}
