import {Routes} from '@angular/router';
import {IsLoggedInUserGuard} from '@app/shared/is-logged-in-user.guard';

export const APP_ROUTES: Routes = [
    {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.HomePageModule),
        canActivate: [IsLoggedInUserGuard]
    },
    {
        path: 'game/:id',
        loadChildren: () => import('./game/game.module').then(m => m.GamePageModule),
        canActivate: [IsLoggedInUserGuard]
    },
    {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full'
    }
];
