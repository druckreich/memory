import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GameMode, User} from '@state/main.models';
import {ModalController} from '@ionic/angular';
import {LogInModalComponent} from '@app/shared/log-in-modal/log-in-modal.component';
import {GameService} from '@state/game.service';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {GoToGame} from '@state/navigation.actions';
import {MainState} from '@state/main.state';
import {Select} from '@ngxs/store';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

    public readonly games: GameMode[] = this.gameService.getReleasedGames();

    @Select(MainState)
    public readonly user: User;

    @Dispatch()
    public gotoGame = (gameId: string) => new GoToGame(gameId);

    constructor(public gameService: GameService, public modalController: ModalController) {

    }

    async showUserModal() {
        const modal = await this.modalController.create({
            component: LogInModalComponent,
            cssClass: 'user',
            backdropDismiss: false
        });

        return await modal.present();
    }
}
