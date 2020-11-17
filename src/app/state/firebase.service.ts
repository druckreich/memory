import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {Game, GameStats, Highscore, User} from '@state/game.models';
import {map, observeOn, take} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {Store} from '@ngxs/store';
import {GameState} from '@state/game.state';
import {GameFacade} from '@state/game.facade';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    private readonly user: User = this.store.selectSnapshot(GameState.user);

    private readonly highscoreSubject: Subject<Highscore> = new Subject<Highscore>();
    public readonly highscore$: Observable<Highscore> = this.highscoreSubject.asObservable();

    constructor(public store: Store,
                public gameFacade: GameFacade,
                public firestore: AngularFirestore) {
    }

    public userExists(username: string): Observable<User> {
        return this.firestore.collection('user').doc(username).get().pipe(
            take(1),
            map(d => d.data() as User)
        );
    }

    public getUser(user: User) {
        return this.firestore.doc('user/' + user.username).get()
            .pipe(
                take(1),
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
        let highscores: Observable<Highscore[]> = this.firestore
            .doc<Highscore>('game/image_double_debug')
            .collection('highscore')
            .get()
            .pipe(
                take(1),
                map(d => d.docs.map((r) => ({id: r.id, ...r.data() as Highscore})))
            );

        if (sorted) {
            highscores = highscores.pipe(
                map((h: Highscore[]) => h.sort((a: Highscore, b: Highscore) => a.time - b.time))
            );
        }

        if (limit) {
            highscores = highscores.pipe(
                map((h: Highscore[]) => h.slice(0, limit))
            );
        }
        return highscores;
    }

    public setHighscore(game: Game, time: number, moves: number): Promise<Highscore> {
        const highscore: Highscore = {username: this.user.username, time, moves};
        return this.firestore
            .doc<Highscore>('game/' + game.id)
            .collection('highscore')
            .add(highscore)
            .then((data => {
                    this.highscoreSubject.next({...highscore, id: data.id});
                    return {...highscore, id: data.id};
                })
            );

    }

    public getUserStats(game: Game): Observable<GameStats> {
        if (!this.user) {
            return null;
        }
        return this.firestore.doc<GameStats>('user/' + this.user.username)
            .collection('stats')
            .doc(this.gameFacade.gameToId(game))
            .valueChanges()
            .pipe(take(1));
    }

    public setUserStats(game: Game, stats: GameStats): Promise<void>  {
        return this.firestore.doc<GameStats>('user/' + this.user.username)
            .collection('stats')
            .doc(this.gameFacade.gameToId(game))
            .set(stats);
    }

    public updateGameStats(game: Game, stats: GameStats): Promise<void> {
        return this.firestore.doc<GameStats>('user/' + this.user.username)
            .collection('stats')
            .doc(this.gameFacade.gameToId(game))
            .update(stats);
    }
}
