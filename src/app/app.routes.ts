import {Routes} from '@angular/router';
import {IsAuthenticatedGuard} from '@app/shared/is-authenticated-guard.service';

export const APP_ROUTES: Routes = [
    {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
        canActivate: [IsAuthenticatedGuard]
    },
    {
        path: 'game/:id',
        loadChildren: () => import('./game/game.module').then(m => m.GamePageModule),
        canActivate: [IsAuthenticatedGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full'
    }
];
