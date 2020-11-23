import {Component, OnInit} from '@angular/core';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import {GameFacade} from '@state/game.facade';
import {FirebaseService} from '@state/firebase.service';

@Component({
    selector: 'memo-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    constructor(private gameFacade: GameFacade, private firebaseService: FirebaseService) {
    }

    ngOnInit(): void {
    }

    successCallback($event: FirebaseUISignInSuccessWithAuthResult) {
        const isNewUser: boolean = $event.authResult.additionalUserInfo.isNewUser;
        if(isNewUser) {
            // new user
            const username = 'smarti';
            this.firebaseService.setUsername(username).then(() => {
                this.gameFacade.navigateToMenu();
            });
        } else {
            // welcome user back!
        }

    }

    errorCallback($event: FirebaseUISignInFailure) {
    }

    uiShownCallback() {
    }
}
