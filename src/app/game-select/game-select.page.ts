import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Game, GameMode} from '@state/main.models';
import {GameService} from '@state/game.service';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

@Component({
    selector: 'memo-game-select',
    templateUrl: './game-select.page.html',
    styleUrls: ['./game-select.page.scss'],
})
export class GameSelectPage implements OnInit {

    public readonly gameMode: GameMode;
    public readonly games: Game[];

    constructor(public store: Store, public activatedRoute: ActivatedRoute, public gameService: GameService) {
        const gameModeId: string = this.activatedRoute.snapshot.params.id;
        this.gameMode = this.gameService.getGameModeId(gameModeId);
        this.games = this.gameService.getGamesByGameModeId(gameModeId);
    }

    ngOnInit() {
    }

    selectGame(game: Game) {
        this.store.dispatch(new Navigate(['game', game.id]));
    }
}
