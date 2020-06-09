import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameMode} from '@state/main.models';
import {GameService} from '@state/game.service';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

    public readonly gameModes: GameMode[];

    constructor(public store: Store, public gameService: GameService) {
        this.gameModes = this.gameService.getGameModes();

    }

    selectGameMode(gameMode: GameMode): void {
        this.store.dispatch(new Navigate(['game-select', gameMode.id]));
    }
}
