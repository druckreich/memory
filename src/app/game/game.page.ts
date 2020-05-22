import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GAME_MODES, GameMode, Stone} from "../state/main.models";
import {GameService} from "../state/game.service";
import {GAME_TIMER_STATUS} from "./game-timer/game-timer.component";


@Component({
    selector: 'memo-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

    stones: Stone[];

    backdropClickFn: Function = () => {
    };

    showGame: boolean = false;
    showBackdrop: boolean = false;

    showCountdown: boolean = false;
    timerStatus: GAME_TIMER_STATUS;

    constructor(public activatedRoute: ActivatedRoute, public gameService: GameService) {
    }

    ngOnInit() {
        const gameId: string = this.activatedRoute.snapshot.params.id;
        const gameMode = GAME_MODES.find((gameMode: GameMode) => gameMode.id == gameId);

        this.gameService.createStones(gameMode).subscribe((stones: Stone[]) => {
            this.stones = stones;
            this.startCountdown();
        });
    }

    startCountdown(): void {
        this.showGame = true;
        this.showBackdrop = true;
        this.showCountdown = true;
    }

    startGame(): void {
        this.showBackdrop = false;
        this.showCountdown = false;
        this.timerStatus = GAME_TIMER_STATUS.START;
    }

    onTick() {

    }

    onStoneClick(stone: Stone): void {
        if (stone.showFront == true) {
            return;
        }
        stone.showFront = true;

        let stonesWithFrontShown: Stone[] = this.stones.filter((stone: Stone) => stone.showFront === true && stone.hasBeenFound === false);
        const setIds: string[] = stonesWithFrontShown.map((stone: Stone) => stone.setId).filter((value, index, self) => self.indexOf(value) === index);

        // invalid
        if (setIds.length > 1 && stonesWithFrontShown.length > 1) {
            this.showBackdrop = true;
            this.backdropClickFn = () => {
                stonesWithFrontShown.forEach((stone: Stone) => stone.showFront = false);
                this.showBackdrop = false;
                this.backdropClickFn = () => {
                };
            };
            return;
        }

        // valid
        if (setIds.length === 1 && stonesWithFrontShown.length == stone.setSize) {
            //this.showBackdrop = true;
            let notFoundStones: Stone[] = this.stones.filter((stone: Stone) => stone.showFront === false);
            if (notFoundStones.length > 0) {
                this.backdropClickFn = () => {
                    stonesWithFrontShown.forEach((stone: Stone) => stone.hasBeenFound = true);
                    //this.showBackdrop = false;
                    this.backdropClickFn = () => {
                    };
                };
            } else {
                this.timerStatus = GAME_TIMER_STATUS.RUN;
            }
            return;
        }
    }
}
