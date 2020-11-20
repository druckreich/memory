import {Injectable} from '@angular/core';
import {Game, GameMode, GameType, Stone} from './game.models';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {SelectSnapshot} from '@ngxs-labs/select-snapshot';
import {GameState} from '@state/game.state';
import {NumberGame} from '@app/shared/util/number.game';
import {ImageGame} from '@app/shared/util/image.game';
import {FirebaseService} from '@state/firebase.service';

@Injectable({
    providedIn: 'root'
})
export class GameFacade {

    @SelectSnapshot(GameState.gameModes)
    public gameModes: GameMode[];

    @SelectSnapshot(GameState.games)
    public games: Game[];

    constructor(public store: Store,
                public numberGame: NumberGame,
                public imageGame: ImageGame) {
    }

    public navigateToAuth(): void {
        this.store.dispatch(new Navigate(['auth']));
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
        return game.id;
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
        return this.games.find((game: Game) => game.id === gameId);
    }

    public createStones(game: Game): Observable<Stone[]> {
        let stones: Observable<Stone[]>;
        switch (game.gameMode.id) {
            case GameType.image:
                stones = this.imageGame.createStones(game);
                break;
            case GameType.number:
                stones = this.numberGame.createStones(game);
                break;
        }
        return stones
    }


}
