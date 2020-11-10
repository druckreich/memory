import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameMode} from '@state/main.models';
import {GameFacade} from '@state/game.facade';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuPage {

    public readonly gameModes: GameMode[] = this.gameFacade.getGameModes();

    constructor(public gameFacade: GameFacade) {

    }

    selectGameMode(gameMode: GameMode): void {
        console.log('CHECK');
        this.gameFacade.navigateToDifficultySelect(gameMode.id);
    }
}
