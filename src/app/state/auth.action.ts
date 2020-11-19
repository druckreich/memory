import {User} from '@state/game.models';

export class SetUser {
    static readonly type = '[Main] Set Username';

    constructor(public user: User) {
    }
}
