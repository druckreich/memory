import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {GameStats, Highscore, User} from '@state/main.models';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {MainState} from '@state/main.state';


@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    private readonly user: User = this.store.selectSnapshot(MainState.user);

    constructor(public store: Store, private firestore: AngularFirestore) {
    }

    public userExists(username: string): Observable<User> {
        return this.firestore.collection('user').doc(username).get().pipe(
            map(d => d.data() as User)
        );
    }

    public getUser(user: User) {
        return this.firestore.doc('user/' + user.username).get().pipe(
            map(action => {
                const data = action.data() as User;
                const id = action.id;
                return {id, ...data} as User;
            })
        );
    }

    public setUser(user: User) {
        return this.firestore.collection('user').doc(user.username).set(user);
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

    public setHighscore(gameMode: string, milliseconds: number): Promise<Highscore> {
        const highscore: Highscore = {username: this.user.username, score: milliseconds};
        return this.firestore.doc<Highscore>('game/' + gameMode).collection('highscore').add(highscore)
            .then((data => {
                    return {...highscore, id: data.id};
                })
            );
    }

    public getUserStats(gameId: string): Observable<GameStats> {
        if (!this.user) {
            return null;
        }
        return this.firestore.doc<GameStats>('user/' + this.user.username).collection('stats').doc(gameId).valueChanges();
    }

    public setUserStats(gameId: string, stats: GameStats): any {
        return this.firestore.doc<GameStats>('user/' + this.user.username).collection('stats').doc(gameId).set(stats);
    }

    public updateGameStats(gameId: string, stats: GameStats): any {
        return this.firestore.doc<GameStats>('user/' + this.user.username).collection('stats').doc(gameId).update(stats);
    }
}
