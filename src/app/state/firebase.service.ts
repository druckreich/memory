import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {GameStats, Highscore, User} from '@state/main.models';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngxs/store';
import {MainState} from '@state/main.state';


@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    private readonly user: User = this.store.selectSnapshot(MainState.user);

    constructor(public store: Store, private firestore: AngularFirestore) {
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
        highscore.username = this.user.username;
        return this.firestore.doc<Highscore>('game/' + gameMode).collection('highscore').add(highscore);
    }

    public getUserStats(gameMode: string): Observable<GameStats> {
        if (!this.user) {
            return null;
        }

        return this.firestore.doc<GameStats>('user/' + this.user.username).collection('stats').doc(gameMode).get().pipe(
            map(d => {
                if (d.exists) {
                    return {id: d.id, ...d.data() as GameStats};
                }
            }));
    }

    public setUserStats(gameMode: string, stats: GameStats) {
        return this.firestore.doc<GameStats>('user/' + this.user.username).collection('stats').doc(gameMode).update(stats);
    }

    public setUserStatsIfNotExists(gameMode: string) {
        if (!this.user) {
            return null;
        }

        const subscription: Subscription = this.getUserStats(gameMode).subscribe((stats: GameStats) => {
            if (undefined === stats) {
                const s: GameStats = {completed: 0};
                this.firestore.doc<GameStats>('user/' + this.user.username).collection('stats').doc(gameMode).set(s);
            }
        });
    }

}
