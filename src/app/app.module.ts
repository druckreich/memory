import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PreloadAllModules, RouteReuseStrategy, RouterModule} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {NgxsModule} from '@ngxs/store';
import {GAME_STATE_TOKEN, GameState, GameStateModel} from '@state/game.state';
import {environment} from '@environment/environment';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';
import {LogInModalComponent} from '@app/shared/log-in-modal/log-in-modal.component';
import {APP_ROUTES} from '@app/app.routes';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsSelectSnapshotModule} from '@ngxs-labs/select-snapshot';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/shared.module';


@NgModule({
    declarations: [
        AppComponent,
        LogInModalComponent
    ],
    entryComponents: [
        LogInModalComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        IonicModule.forRoot(),

        // firebase integration
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,

        // ngxs integration
        NgxsModule.forRoot([GameState], {developmentMode: true}),
        NgxsStoragePluginModule.forRoot({
            key: GAME_STATE_TOKEN
        }),
        NgxsRouterPluginModule.forRoot(),
        NgxsDispatchPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsSelectSnapshotModule.forRoot(),

        RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules})
    ],
    providers: [
        StatusBar,
        SplashScreen,

        // firebase integration
        AngularFirestore,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
