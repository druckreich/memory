import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Game, GameMode} from '@state/main.models';
import {GameFacade} from '@state/game.facade';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

@Component({
    selector: 'memo-mode',
    templateUrl: './mode.component.html',
    styleUrls: ['./mode.component.scss'],
})
export class ModeComponent implements OnInit {

    public readonly gameMode: GameMode;
    public readonly games: Game[];

    constructor(public store: Store, public activatedRoute: ActivatedRoute, public gameFacade: GameFacade) {
        const gameModeId: string = this.activatedRoute.snapshot.params.modeId;
        this.gameMode = this.gameFacade.getGameModeId(gameModeId);
        this.games = this.gameFacade.getGamesByGameModeId(gameModeId);
    }

    ngOnInit() {
    }

    selectGame(game: Game) {
        this.gameFacade.navigateToGame(game.id);
    }
}
