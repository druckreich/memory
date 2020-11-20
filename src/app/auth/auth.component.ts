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
        // if is new show modal for user
        this.firebaseService.setUsername('smarti').then(() => {
            console.log('IS NEW USER', );
            this.gameFacade.navigateToMenu();
        });

    }

    errorCallback($event: FirebaseUISignInFailure) {
    }

    uiShownCallback() {
    }
}
