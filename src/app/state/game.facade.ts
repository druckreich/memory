import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game, GameMode, Stone, StoneState} from './main.models';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {GAME_MODE_IDS, GAME_MODES, GAMES} from '@state/game.model';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

@Injectable({
    providedIn: 'root'
})
export class GameFacade {

    constructor(public store: Store,
                public http: HttpClient) {
    }

    public navigateToMenu() {
        this.store.dispatch(new Navigate(['menu']));
    }

    public navigateToGame(id: string) {
        this.store.dispatch(new Navigate(['game', id]));
    }

    public navigateToDifficultySelect(gameModeId: string) {
        this.store.dispatch(new Navigate(['menu', gameModeId]));
    }

    public gameToId(game: Game): string {
        return `${game.gameMode.id}_${game.id}`;
    }

    public getGameModes(): GameMode[] {
        return GAME_MODES;
    }

    public getGameModeById(gameModeId: string): GameMode {
        return GAME_MODES.find((gm: GameMode) => gm.id === gameModeId);
    }

    public getGamesByGameMode(gameMode: GameMode): Game[] {
        return GAMES.filter((game: Game) => game.gameMode.id === gameMode.id);
    }

    public getGameById(gameId: string) {
        const split: string[] = gameId.split('_');
        const games: Game[] = this.getGamesByGameMode(this.getGameModeById(split[0]));
        return games.find((game: Game) => game.id === split[1]);
    }

    public createStones(game: Game): Observable<Stone[]> {
        switch (game.gameMode.id) {
            case GAME_MODE_IDS.images:
                return this.createStonesForImages(game);
            case GAME_MODE_IDS.number:
                return this.createStonesForNumbers(game);
        }
    }

    private createStonesForNumbers(game: Game): Observable<Stone[]> {
        // check for number range e.g. [1-9]
        // create a random calculation for a random number
        // create 2 stones calculation <-> result
        return of([]);
    }

    private createStonesForImages(game: Game): Observable<Stone[]> {
        return this.http.get('assets/icons.json')
            .pipe(
                map((icons: string[]) => {
                    let stones: Stone[] = [];
                    const uniqueSets: string[] = this.getRandomElementsFromArray(icons, game.setNumber);
                    for (let i = 0; i < uniqueSets.length; i++) {
                        stones = stones.concat(this.createSet(game.setSize, uniqueSets[i]));
                    }
                    return this.shuffleArray(stones);
                })
            );
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
}
