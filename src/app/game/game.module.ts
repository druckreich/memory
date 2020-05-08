import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GamePageRoutingModule} from './game-routing.module';

import {GamePage} from './game.page';
import {HttpClientModule} from "@angular/common/http";
import {CountdownComponent} from "./countdown/countdown.component";

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        IonicModule,
        GamePageRoutingModule,

    ],
    entryComponents: [CountdownComponent],
    declarations: [GamePage, CountdownComponent]
})
export class GamePageModule {
}
