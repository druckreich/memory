import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {MainState} from '@state/main.state';
import {User} from '@state/main.models';
import {ModalController} from '@ionic/angular';
import {LogInModalComponent} from '@app/shared/log-in-modal/log-in-modal.component';

@Injectable({
    providedIn: 'root'
})
export class IsLoggedInUserGuard implements CanActivate {

    @Select(MainState)
    public readonly user: Observable<User>;

    constructor(public modalController: ModalController) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.showUserModal();

    }

    async showUserModal() {
        const modal = await this.modalController.create({
            component: LogInModalComponent,
            cssClass: 'user',
            backdropDismiss: false
        });

        modal.present();

        return await modal.onDidDismiss().then(
            (data) => {
                return true;
            }
        );
    }

}
