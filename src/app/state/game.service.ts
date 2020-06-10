import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game, GameMode, Stone, StoneState} from './main.models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GAME_MODES, GAMES} from '@state/game.model';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor(public http: HttpClient) {
    }

    public getGameModes(): GameMode[] {
        return GAME_MODES;
    }

    public getGameModeId(gameModeId: string): GameMode {
        return GAME_MODES.find((gm: GameMode) => gm.id === gameModeId);
    }

    public getGamesByGameModeId(gameModeId: string): Game[] {
        return GAMES.filter((game: Game) => game.gameMode.id === gameModeId);
    }

    public getGameById(gameId: string) {
        return GAMES.find((game: Game) => game.id === gameId);
    }

    public createStones(game: Game): Observable<Stone[]> {
        return this.http.get('assets/icons.json').pipe(
            map((icons: string[]) => {
                let stones: Stone[] = [];
                const uniqueSets: string[] = this.getRandomElementsFromArray(icons, game.setNumber);
                for (let i = 0; i < uniqueSets.length; i++) {
                    stones = stones.concat(this.createSet(game.setSize, uniqueSets[i]));
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
