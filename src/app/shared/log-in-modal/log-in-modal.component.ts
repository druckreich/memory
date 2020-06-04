import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {ModalController} from '@ionic/angular';
import {FirebaseService} from '@state/firebase.service';
import {User} from '@state/main.models';
import {SetUser} from '@state/main.actions';

@Component({
    selector: 'log-in-modal',
    templateUrl: './log-in-modal.component.html',
    styleUrls: ['./log-in-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogInModalComponent implements OnInit {

    invalid = false;

    constructor(public store: Store, public firebaseService: FirebaseService, public modalController: ModalController) {
    }

    ngOnInit() {
    }

    onContinueAsGuest() {
        this.modalController.dismiss();
    }

    onSetUser(username: string, password: string) {
        const user: User = {username, password};
        this.firebaseService.checkUser(user.username).subscribe((u: User) => {
            // username exists and password is the same -> login
            if (u) {
                if (u.password === password) {
                    this.storeAndDismiss(user);
                } else {
                    this.invalid = true;
                }
            } else {
                this.firebaseService.setUser(user).then(
                    () => this.storeAndDismiss(user)
                );
            }
        });
    }

    storeAndDismiss(user: User) {
        this.store.dispatch(new SetUser(user))
            .subscribe(() => {
                return this.modalController.dismiss();
            })
            .unsubscribe();
    }
}
