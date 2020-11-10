import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Game, GameMode} from '@state/main.models';
import {GameFacade} from '@state/game.facade';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

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
        this.gameMode = this.gameFacade.getGameModeById(gameModeId);
        this.games = this.gameFacade.getGamesByGameMode(this.gameMode);
    }

    ngOnInit() {
    }

    selectGame(game: Game) {
        this.gameFacade.navigateToGame(this.gameFacade.gameToId(game));
    }
}
