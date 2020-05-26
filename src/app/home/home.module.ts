import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {GameButtonComponent} from './game-button/game-button.component';
import {UserModalComponent} from '@app/home/user-modal/user-modal.component';
import {SharedModule} from '@app/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        HomePageRoutingModule
    ],
    declarations: [
        HomePage,
        GameButtonComponent,
        UserModalComponent
    ],
    entryComponents: [
        UserModalComponent
    ]
})
export class HomePageModule {
}
