import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxsModule} from '@ngxs/store';
import {MainState} from '@state/main.state';
import {environment} from '@environment/environment';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator';
import {NavigationState} from '@state/navigation.state';
import {LogInModalComponent} from '@app/shared/log-in-modal/log-in-modal.component';


@NgModule({
    declarations: [
        AppComponent,
        LogInModalComponent
    ],
    entryComponents: [
        LogInModalComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,

        // firebase integration
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,

        // ngxs integration
        NgxsModule.forRoot([MainState, NavigationState], {
            developmentMode: !environment.production
        }),
        NgxsStoragePluginModule.forRoot({
            key: [MainState]
        }),
        NgxsRouterPluginModule.forRoot(),
        NgxsDispatchPluginModule.forRoot()
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
