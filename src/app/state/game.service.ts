import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GameMode, Stone, StoneState} from './main.models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor(public http: HttpClient) {
    }

    createStones(gameMode: GameMode): Observable<Stone[]> {
        return this.http.get('assets/icons.json').pipe(
            map((icons: string[]) => {
                let stones: Stone[] = [];
                const uniqueSets: string[] = this.getRandomElementsFromArray(icons, gameMode.setNumber);
                for (let i = 0; i < uniqueSets.length; i++) {
                    stones = stones.concat(this.createSet(gameMode.setSize, uniqueSets[i]));
                }
                // return stones.sort(() => Math.random() - 0.5);
                return stones;
            }));
    }

    createSet(setSize: number, icon: string): Stone[] {
        const set: Stone[] = [];
        for (let i = 0; i < setSize; i++) {
            set.push({
                id: `${icon}_${i}`,
                setId: icon,
                setSize,
                icon,
                state: StoneState.flipped,
                disabled: false
            });
        }
        return set;
    }

    getRandomElementsFromArray(arr, n) {
        const result = new Array(n);
        let len = arr.length;
        const taken = new Array(len);
        if (n > len) {
            throw new RangeError('getRandom: more elements taken than available');
        }
        while (n--) {
            const x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
}
