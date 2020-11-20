import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, Subscriber} from 'rxjs';
import {firebase} from 'firebaseui-angular';

import {GameFacade} from '@state/game.facade';
import {User} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

    constructor(private gameFacade: GameFacade) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return new Observable((observer: Subscriber<boolean>) => {
            firebase.auth().onAuthStateChanged((user: User) => {
                if (user) {
                    observer.next(true);
                } else {
                    observer.next(false);
                    this.gameFacade.navigateToAuth();
                }
            });
        });
    }
}
