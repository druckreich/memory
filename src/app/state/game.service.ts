import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GameMode, Stone, StoneState} from './main.models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GAME_MODES} from '@state/game.model';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor(public http: HttpClient) {
    }

    public getReleasedGames(): GameMode[] {
        return GAME_MODES.filter((gameMode: GameMode) => gameMode.released === true);
    }

    public getGameModeById(gameModeId: string) {
        return GAME_MODES.find((gameMode: GameMode) => gameMode.id === gameModeId);
    }

    public createStones(gameMode: GameMode): Observable<Stone[]> {
        return this.http.get('assets/icons.json').pipe(
            map((icons: string[]) => {
                let stones: Stone[] = [];
                const uniqueSets: string[] = this.getRandomElementsFromArray(icons, gameMode.setNumber);
                for (let i = 0; i < uniqueSets.length; i++) {
                    stones = stones.concat(this.createSet(gameMode.setSize, uniqueSets[i]));
                }
                return this.shuffleArray(stones);
            }));
    }

    private createSet(setSize: number, icon: string): Stone[] {
        const set: Stone[] = [];
        for (let i = 0; i < setSize; i++) {
            set.push({
                id: `${icon}_${i}`,
                setId: icon,
                setSize,
                icon,
                state: StoneState.flipped,
                disabled: false,
                flipped: true,
                found: false
            });
        }
        return set;
    }

    /**
     * Shuffles array in place.
     * @param {Array} a items An array containing the items.
     */
    private shuffleArray(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    private getRandomElementsFromArray(arr, n) {
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
