import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GameSelectPage} from './game-select.page';

const routes: Routes = [
    {
        path: ':id',
        component: GameSelectPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GameSelectPageRoutingModule {
}
