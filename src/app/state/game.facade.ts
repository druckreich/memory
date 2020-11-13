import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataSourceComposition, Game, GameMode, GameType, Stone, StoneState} from './game.models';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {SelectSnapshot} from '@ngxs-labs/select-snapshot';
import {GameState} from '@state/game.state';
import {v4 as uuidv4} from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class GameFacade {

    @SelectSnapshot(GameState.gameModes)
    public gameModes: GameMode[];

    @SelectSnapshot(GameState.games)
    public games: Game[];

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

    public getGameModeById(gameModeId: string): GameMode {
        return this.gameModes.find((gm: GameMode) => gm.id === gameModeId);
    }

    public getGamesByGameMode(gameMode: GameMode): Game[] {
        return this.games.filter((game: Game) => game.gameMode.id === gameMode.id);
    }

    public getGamesByGameModeId(gameModeId: string): Game[] {
        const gameMode: GameMode = this.getGameModeById(gameModeId);
        return this.getGamesByGameMode(gameMode);
    }

    public getGameById(gameId: string) {
        const split: string[] = gameId.split('_');
        const games: Game[] = this.getGamesByGameMode(this.getGameModeById(split[0]));
        return games.find((game: Game) => game.id === split[1]);
    }

    public createStones(game: Game): Observable<Stone[]> {
        let stones: Observable<Stone[]>;
        switch (game.gameMode.id) {
            case GameType.image:
                stones = this.createStonesForImages(game);
                break;
            case GameType.number:
                stones = this.createStonesForNumbers(game);
                break;
        }
        return stones.pipe(
            map((s: Stone[]) => this.shuffleArray(s)),
            tap((s) => console.log(s))
        );
    }

    private createStonesForNumbers(game: Game): Observable<Stone[]> {
        const composition: DataSourceComposition = game.source.numbers;
        const stones: Observable<Stone[]> = of(composition.source)
            .pipe(
                map((numbers: number[]) => {
                    let s: Stone[] = [];
                    const uniqueSets: number[][] = this.getRandomElementsFromArray(numbers, composition.composition.length);
                    for (let i = 0; i < uniqueSets.length; i++) {
                        const set: Stone[] = [];
                        const source: number[] = uniqueSets[i];
                        const setSize: number = composition.composition[i];
                        // get element from array
                        for (let j = 0; j < setSize; j++) {
                            // every element from the array is an array
                            set.push(this.createStone(uuidv4(), source.join('_'), setSize, game.gameMode.type, source[j].toString()));
                        }
                        s = s.concat(set);
                    }
                    return s;
                })
            );
        return stones;
    }

    private createStonesForImages(game: Game): Observable<Stone[]> {
        const composition: DataSourceComposition = game.source.images;
        const stones: Observable<Stone[]> = this.http.get(composition.source)
            .pipe(
                map((icons: string[]) => {
                    let s: Stone[] = [];
                    const uniqueSets: string[] = this.getRandomElementsFromArray(icons, composition.composition.length);
                    for (let i = 0; i < uniqueSets.length; i++) {
                        const set: Stone[] = [];
                        const source: string = uniqueSets[i];
                        for (let j = 0; j < composition.composition[i]; j++) {
                            set.push(this.createStone(uuidv4(), source, composition.composition[i], game.gameMode.type, source));
                        }
                        s = s.concat(set);
                    }
                    return s;
                })
            );
        return stones;
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

    private createStone(id: string, setId: string, setSize: number, setType: GameType, source: string): Stone {
        return {
            id,
            setId,
            setSize,
            setType,
            source,
            state: StoneState.flipped,
            disabled: false,
            flipped: true,
            found: false
        };
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
