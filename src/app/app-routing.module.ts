import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {IsLoggedInUserGuard} from '@app/shared/is-logged-in-user.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [IsLoggedInUserGuard]
  },
  {
    path: 'game/:id',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule),
    canActivate: [IsLoggedInUserGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
