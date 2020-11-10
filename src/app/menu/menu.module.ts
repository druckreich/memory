import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MenuPage} from '@app/menu/menu.page';
import {ModeComponent} from './mode/mode.component';

const routes: Routes = [
    {
        path: '',
        component: MenuPage,
    },
    {
        path: ':modeId',
        component: ModeComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        MenuPage,
        ModeComponent
    ],
    entryComponents: []
})
export class HomePageModule {
}
