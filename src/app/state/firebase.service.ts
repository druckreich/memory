import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(private firestore: AngularFirestore) {
    }

    public addUser(id: string) {
        return this.firestore.collection('user').add({'user-id': id});
    }

    public getUsers() {
        return this.firestore.collection('user').snapshotChanges();
    }

    public getHighscores() {
        return this.firestore.collection('highscore').snapshotChanges();
    }

}
