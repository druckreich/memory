import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {Game, GameMode, GameStats, Highscore, User} from '@state/main.models';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {MainState} from '@state/main.state';
import {GameFacade} from '@state/game.facade';


@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    private readonly user: User = this.store.selectSnapshot(MainState.user);

    constructor(public store: Store,
                public gameFacade: GameFacade,
                public firestore: AngularFirestore) {
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

    public getHighscore(game: Game, sorted: boolean = false, limit: number = null) {
        let highscores: Observable<Highscore[]> = this.firestore.doc<Highscore>('game/' + this.gameFacade.gameToId(game)).collection('highscore').get()
            .pipe(
                map(d => d.docs.map((r) => ({id: r.id, ...r.data() as Highscore}))
            )
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

    public setHighscore(game: Game, milliseconds: number): Promise<Highscore> {
        const highscore: Highscore = {username: this.user.username, score: milliseconds};
        return this.firestore.doc<Highscore>('game/' + `${game.gameMode.id}_${game.id}`).collection('highscore').add(highscore)
            .then((data => {
                    return {...highscore, id: data.id};
                })
            );
    }

    public getUserStats(game: Game): Observable<GameStats> {
        if (!this.user) {
            return null;
        }
        return this.firestore.doc<GameStats>('user/' + this.user.username).collection('stats').doc(this.gameFacade.gameToId(game)).valueChanges();
    }

    public setUserStats(game: Game, stats: GameStats): any {
        return this.firestore.doc<GameStats>('user/' + this.user.username).collection('stats').doc(this.gameFacade.gameToId(game)).set(stats);
    }

    public updateGameStats(game: Game, stats: GameStats): any {
        return this.firestore.doc<GameStats>('user/' + this.user.username).collection('stats').doc(this.gameFacade.gameToId(game)).update(stats);
    }
}
