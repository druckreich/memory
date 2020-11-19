import {Component, OnInit} from '@angular/core';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';
import {AuthFacade} from '@state/auth.facade';

@Component({
    selector: 'memo-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    constructor(private authFacade: AuthFacade) {
        console.log('CHECK');
    }

    ngOnInit(): void {
    }

    successCallback($event: FirebaseUISignInSuccessWithAuthResult) {

        console.log($event);

    }

    errorCallback($event: FirebaseUISignInFailure) {
        console.log($event);
    }

    uiShownCallback() {
        console.log('uiShownCallback');
    }
}
