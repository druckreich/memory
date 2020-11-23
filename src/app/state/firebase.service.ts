import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {Game, Highscore} from '@state/game.models';
import {map, take} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngxs/store';
import {GameFacade} from '@state/game.facade';
import {firebase} from 'firebaseui-angular';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    private readonly highscoreSubject: Subject<Highscore> = new Subject<Highscore>();
    public readonly highscore$: Observable<Highscore> = this.highscoreSubject.asObservable();

    constructor(public store: Store,
                public gameFacade: GameFacade,
                public firestore: AngularFirestore) {
    }

    public setUsername(username: string): Promise<any>  {
        const user = firebase.auth().currentUser;

        this.existsUsername('xxx').subscribe(_ => console.log(_));

        return this.firestore.doc<any>('user/' + user.uid).set({username});
    }

    public existsUsername(username: string): Observable<any> {
        return this.firestore
            .collection('user', ref => ref.where('username', '==', username))
            .get()
            .pipe(
                take(1),
                map(d => d.docs.map((r) => r.data()))
            );
    }


    public getHighscore(game: Game, sorted: boolean = false, limit: number = null) {
        let highscores: Observable<Highscore[]> = this.firestore
            .doc<Highscore>('game/' + game.id)
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
        const user = firebase.auth().currentUser;
        const highscore: Highscore = {username: user.uid, time, moves};
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


    /*
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
    */
}
