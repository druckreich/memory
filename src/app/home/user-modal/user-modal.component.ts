import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'memo-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {

    constructor(public store: Store, public modalController: ModalController) {
    }

    ngOnInit() {
    }

    onSetUsername(username: string) {
        this.modalController.dismiss(username);
    }

}
