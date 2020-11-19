import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {User} from '@state/game.models';
import {map} from 'rxjs/operators';
import {AuthState} from '@state/auth.state';
import {AuthFacade} from '@state/auth.facade';

@Injectable({
    providedIn: 'root'
})
export class IsLoggedInUserGuard implements CanActivate {

    @Select(AuthState.user)
    public readonly user$: Observable<User>;

    constructor(private authFacade: AuthFacade) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.user$.pipe(
            map((user: User) => {
                if (!user) {
                    this.authFacade.navigateToAuth();
                    return false;
                } else {
                    return true;
                }
            })
        );
    }
}
