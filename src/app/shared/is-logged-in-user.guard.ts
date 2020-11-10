import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Select} from '@ngxs/store';
import {MainState} from '@state/main.state';
import {User} from '@state/main.models';
import {ModalController} from '@ionic/angular';
import {LogInModalComponent} from '@app/shared/log-in-modal/log-in-modal.component';
import {flatMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class IsLoggedInUserGuard implements CanActivate {

    @Select(MainState.user)
    public readonly user$: Observable<User>;

    constructor(public modalController: ModalController) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.user$.pipe(
            flatMap((user: User) => {
                if (user) {
                    return of(true);
                } else {
                    return this.showUserModal();
                }
            })
        );
    }

    async showUserModal(): Promise<boolean> {
        const modal = await this.modalController.create({
            component: LogInModalComponent,
            cssClass: 'user',
            backdropDismiss: false
        });

        modal.present();

        return await modal.onDidDismiss().then(
            (data) => {
                return !!data.data ? true : false;
            }
        );
    }

}
