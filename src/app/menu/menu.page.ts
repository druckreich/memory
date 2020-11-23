import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameMode} from '@state/game.models';
import {GameFacade} from '@state/game.facade';
import {FirebaseService} from '@state/firebase.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuPage {

    public gameModes: GameMode[] = this.gameFacade.gameModes;

    constructor(public gameFacade: GameFacade) {
        if(this.gameModes.length === 1) {
            this.selectGameMode(this.gameModes[0]);
        }
    }

    selectGameMode(gameMode: GameMode): void {
        this.gameFacade.navigateToDifficultySelect(gameMode.id);
    }
}
