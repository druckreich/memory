import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {GAME_MODES, GameMode, User} from '@state/main.models';
import {ModalController} from '@ionic/angular';
import {UserModalComponent} from '@app/home/user-modal/user-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    games: GameMode[] = GAME_MODES;
    user: User = this.store.selectSnapshot(s => s.main.user);

    constructor(public store: Store, public modalController: ModalController) {
    }

    ngOnInit(): void {
        if (!this.user) {
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

        return await modal.present();
    }
}
