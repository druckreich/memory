import {Navigate} from '@ngxs/router-plugin';
import {Store} from '@ngxs/store';
import {NumberGame} from '@app/shared/util/number.game';
import {ImageGame} from '@app/shared/util/image.game';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {

    constructor(public store: Store,
                public numberGame: NumberGame,
                public imageGame: ImageGame) {
    }

    public navigateToAuth() {
        this.store.dispatch(new Navigate(['auth']));
    }
}
