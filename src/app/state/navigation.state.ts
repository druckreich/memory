import {Action, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GoToGame, GoToHome} from '@state/navigation.actions';

export class NavigationStateModel {

}

@State<NavigationStateModel>({
    name: 'navigation'
})
@Injectable()
export class NavigationState {
    @Action([GoToHome, GoToGame])
    navigation(ctx: StateContext<NavigationState>, action: GoToHome) {
        action.execute(ctx, action);
    }
}
