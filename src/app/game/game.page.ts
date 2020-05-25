import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GAME_MODES, GameMode, Stone, StoneState} from "@state/main.models";
import {GameService} from "@state/game.service";
import {GAME_TIMER_STATUS} from "./game-timer/game-timer.component";
import {Store} from "@ngxs/store";

@Component({
    selector: 'memo-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

    stones: Stone[];

    gameMode: GameMode;
    showGame: boolean = false;
    disableStones: boolean = false;
    showBackdrop: boolean = false;
    showCountdown: boolean = false;
    timerStatus: GAME_TIMER_STATUS = GAME_TIMER_STATUS.STOP;

    unflippedStones: Stone[] = [];

    constructor(public store: Store, public activatedRoute: ActivatedRoute, public gameService: GameService) {
    }

    ngOnInit() {
        const gameId: string = this.activatedRoute.snapshot.params.id;
        this.gameMode = GAME_MODES.find((gameMode: GameMode) => gameMode.id == gameId);

        this.gameService.createStones(this.gameMode).subscribe((stones: Stone[]) => {
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
        this.disableStones = false;
        this.showCountdown = false;
        this.timerStatus = GAME_TIMER_STATUS.START;
    }

    stopGame(): void {
        this.showBackdrop = true;
        this.disableStones = true;
        this.showCountdown = false;
        this.timerStatus = GAME_TIMER_STATUS.STOP;
    }

    onTick(ms: number) {
    }

    onStoneClicked(stone: Stone): void {
        this.unflippedStones.push(stone);
        //let unflippedStones: Stone[] = this.stones.filter((stone: Stone) => stone.isValid && stone.state === 'unflipped');
        if(this.unflippedStones.length == this.gameMode.setSize) {
            this.disableStones = true;
        }
    }

    onStoneFound(stone: Stone): void {
        let notFound: Stone = this.stones.find((stone: Stone) => stone.disabled === false);
        if(notFound == null) {
            this.stopGame();
        }
    }

    onStoneFlipped(stone: Stone): void {

    }

    onStoneUnflipped(stone: Stone): void {
        if(this.unflippedStones.length < this.gameMode.setSize) {
            return;
        }

        const setIds: string[] = this.unflippedStones
            .map((stone: Stone) => stone.setId)
            .filter((value, index, self) => self.indexOf(value) === index);

        // the stones are invalid - flip it back
        if (setIds.length > 1) {
            const stones: Stone[] = [...this.unflippedStones];
            this.unflippedStones = [];
            setTimeout(() => {
                stones.forEach((stone: Stone) => stone.state = StoneState.flipped);
                this.disableStones = false;
            }, 400);
            return;
        }

        // the stones are valid - remove them from the board
        if (setIds.length === 1 && this.unflippedStones.length == stone.setSize) {
            const stones: Stone[] = [...this.unflippedStones];
            stones.forEach((stone: Stone) => stone.disabled = true);
            this.unflippedStones = [];
            this.disableStones = false;
            setTimeout(() => {
                stones.forEach((stone: Stone) => stone.state = StoneState.found);

            }, 400);
        }
    }
}
