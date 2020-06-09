import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {GameModeButtonComponent} from '@app/home/game-mode-button/game-mode-button.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule
    ],
    declarations: [
        HomePage,
        GameModeButtonComponent
    ],
    entryComponents: []
})
export class HomePageModule {
}
