import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from '@app/auth/auth.component';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '@environment/environment';
import {IonicModule} from '@ionic/angular';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
            requireDisplayName: false,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        },
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    tosUrl: '<your-tos-link>',
    privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
    }
];

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FirebaseUIModule,
        IonicModule,
    ]
})
export class AuthModule {
}
