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
        let highscores: Observable<Highscore[]> = this.firestore.doc<Highscore>('game/' + gameMode).collection('highscore').get().pipe(
            map(d => d.docs.map((r) => {
                return {
                    id: r.id, ...r.data() as Highscore
                };
            }))
        );

        if (sorted) {
            highscores = highscores.pipe(
                map((h: Highscore[]) => h.sort((a: Highscore, b: Highscore) => a.score - b.score))
            );
        }

        if (limit) {
            highscores = highscores.pipe(
                map((h: Highscore[]) => h.slice(0, limit))
            );
        }

        return highscores;
    }

    public setHighscore(gameMode: string, highscore: Highscore) {
        return this.firestore.doc<Highscore>('game/' + gameMode).collection('highscore').add(highscore);
    }

}
