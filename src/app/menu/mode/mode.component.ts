import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Game, GameMode} from '@state/game.models';
import {GameFacade} from '@state/game.facade';
import {Select, Selector, Store} from '@ngxs/store';
import {GameState, GameStateModel} from '@state/game.state';
import {Observable} from 'rxjs';

@Component({
    selector: 'memo-mode',
    templateUrl: './mode.component.html',
    styleUrls: ['./mode.component.scss'],
})
export class ModeComponent implements OnInit {

    public readonly games: Game[];
    public readonly gameMode: GameMode;

    constructor(public activatedRoute: ActivatedRoute,
                public gameFacade: GameFacade) {
        const gameModeId: string = this.activatedRoute.snapshot.params.modeId;
        this.gameMode = this.gameFacade.getGameModeById(gameModeId);
        this.games = this.gameFacade.getGamesByGameModeId(gameModeId);
    }

    ngOnInit() {
    }

    selectGame(game: Game) {
        this.gameFacade.navigateToGame(this.gameFacade.gameToId(game));
    }
}
