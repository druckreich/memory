import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {GamePageRoutingModule} from './game-routing.module';

import {GamePage} from './game.page';
import {GameCountdownComponent} from './game-countdown/game-countdown.component';
import {GameTimerComponent} from './game-timer/game-timer.component';
import {GameStoneComponent} from './game-stone/game-stone.component';
import {GameHighscoreModalComponent} from '@app/game/game-highscore-modal/game-highscore-modal.component';
import {SharedModule} from '@app/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        GamePageRoutingModule
    ],
    entryComponents: [
        GameHighscoreModalComponent
    ],
    declarations: [
        GamePage,
        GameHighscoreModalComponent,
        GameCountdownComponent,
        GameTimerComponent,
        GameStoneComponent
    ]
})
export class GamePageModule {
}
