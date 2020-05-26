import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {GAME_MODES, GameMode} from '@state/main.models';
import {ModalController} from '@ionic/angular';
import {UserModalComponent} from '@app/home/user-modal/user-modal.component';
import {SetUsername} from '@state/main.actions';
import {MainState} from '@state/main.state';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    games: GameMode[] = GAME_MODES;
    username: string = this.store.selectSnapshot(MainState.username);

    constructor(public store: Store, public modalController: ModalController) {
    }

    ngOnInit(): void {
        if (!this.username) {
            this.showUserModal();
        }
    }

    onClick(game: GameMode) {
        this.store.dispatch(new Navigate(['/game', game.id]));
    }

    async showUserModal() {
        const modal = await this.modalController.create({
            component: UserModalComponent,
            cssClass: 'user',
            backdropDismiss: false
        });

        modal.onDidDismiss().then(data => {
            this.store.dispatch(new SetUsername(data.data));
        });

        return await modal.present();
    }
}
