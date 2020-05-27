import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {Highscore, User} from '@state/main.models';
import {map} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(private firestore: AngularFirestore, public db: AngularFireDatabase) {
    }

    public getUser(user: User) {
        return this.firestore.doc('user/' + user.username).snapshotChanges().pipe(
            map(action => {
                const data = action.payload.data() as User;
                const id = action.payload.id;
                return {id, ...data} as User;
            })
        );
    }

    public checkUser(username: string): Observable<User> {
        return this.firestore.collection('user').doc(username).get().pipe(
            map(d => d.data() as User)
        );
    }

    public setUser({username, password}) {
        return this.firestore.collection('user').doc(username).set({username, password});
    }

    public getHighscore(gameMode: string, sorted: boolean = false, limit: number = null) {
        let highscore: Observable<Highscore[]> = this.firestore.doc<Highscore>('game/' + gameMode).collection('highscore').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Highscore;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                })
            )
        );

        console.log('xxx');

        if (sorted) {
            highscore = highscore.pipe(
                map((highscores: Highscore[]) => highscores.sort((a: Highscore, b: Highscore) => a.score - b.score))
            );
        }

        if (limit) {
            highscore = highscore.pipe(
                map((highscores: Highscore[]) => highscores.slice(0, 3))
            );
        }

        return highscore;
    }

    public setHighscore(gameMode: string, highscore: Highscore) {
        return this.firestore.doc<Highscore>('game/' + gameMode).collection('highscore').add(highscore);
    }

}
