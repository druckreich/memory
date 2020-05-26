import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {Highscore} from '@state/main.models';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(private firestore: AngularFirestore) {
    }

    public getHighscore(gameMode: string) {
        return this.firestore.doc<Highscore>('game/' + gameMode).collection('highscore').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Highscore;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                })
            )
        )
    }

    public setHighscore(gameMode: string, highscore: Highscore) {
        return this.firestore.doc<Highscore>('game/' + gameMode).collection('highscore').add(highscore);
    }

}
