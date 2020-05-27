import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameMode, Highscore, Stone, StoneState} from '@state/main.models';
import {GameService} from '@state/game.service';
import {GAME_TIMER_STATUS} from './game-timer/game-timer.component';
import {Store} from '@ngxs/store';
import {ModalController} from '@ionic/angular';
import {GameHighscoreModalComponent} from '@app/game/game-highscore-modal/game-highscore-modal.component';
import {MainState} from '@state/main.state';
import {Navigate} from '@ngxs/router-plugin';

@Component({
    selector: 'memo-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

    stones: Stone[];
    unflippedStones: Stone[] = [];

    username: string = this.store.selectSnapshot(MainState.username);

    gameMode: GameMode;
    showStones = false;
    disableStones = false;
    showBackdrop = false;
    showCountdown = false;
    timerStatus: GAME_TIMER_STATUS = GAME_TIMER_STATUS.STOP;
    milliseconds: number;

    constructor(public store: Store,
                public activatedRoute: ActivatedRoute,
                public gameService: GameService,
                public modalController: ModalController) {
    }

    ngOnInit() {
        const gameModeId: string = this.activatedRoute.snapshot.params.id;
        this.gameMode = this.gameService.getGameModeById(gameModeId);
        const props: any = {
            firstRun: true,
            gameMode: this.gameMode,
            highscore: {username: this.username, score: null} as Highscore
        };
        this.showHighscoreModal(props, (data) => {
            this.prepareGame();
        });
    }

    gameModeRows(): number[] {
        return Array(this.gameMode.rows).fill(0).map((x, i) => i);
    }

    gameModeCols(): number[] {
        return Array(this.gameMode.cols).fill(0).map((x, i) => i);
    }

    async showHighscoreModal(props: any, dismissHandler: any) {
        const modal = await this.modalController.create({
            component: GameHighscoreModalComponent,
            cssClass: 'highscore',
            componentProps: props
        });
        modal.onDidDismiss().then((data) => dismissHandler(data));
        return await modal.present();
    }

    prepareGame(): void {
        this.timerStatus = GAME_TIMER_STATUS.RESET;
        this.gameService.createStones(this.gameMode).subscribe((stones: Stone[]) => {
            this.stones = stones;
            this.startCountdown();
        });
    }

    startCountdown(): void {
        this.showStones = true;
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

        const props: any = {
            firstRun: false,
            gameMode: this.gameMode,
            highscore: {username: this.username, score: this.milliseconds} as Highscore
        };
        this.showHighscoreModal(props, (data) => {
            if (data.data === 'retry') {
                this.prepareGame();
            }

            if (data.data === 'main') {
                this.store.dispatch(new Navigate(['/home']));
            }
        });
    }

    onTick(ms: number) {
        this.milliseconds = ms;
    }

    onStoneTabbed(stone: Stone): void {
        this.unflippedStones.push(stone);
        if (this.unflippedStones.length === this.gameMode.setSize) {
            this.disableStones = true;
        }
    }

    onStoneFound(stone: Stone): void {
    }

    onStoneFlipped(stone: Stone): void {
    }

    // flip animation ends
    onStoneUnflipped(stone: Stone): void {
        if (this.unflippedStones.length < this.gameMode.setSize) {
            return;
        }

        const setIds: string[] = this.unflippedStones
            .map((s: Stone) => s.setId)
            .filter((value, index, self) => self.indexOf(value) === index);

        // the stones are invalid - flip it back
        if (setIds.length > 1) {
            const stones: Stone[] = [...this.unflippedStones];
            this.unflippedStones = [];
            setTimeout(() => {
                stones.forEach((s: Stone) => {
                    s.flipped = true;
                    s.state = StoneState.flipped;
                });
                this.disableStones = false;
            }, 400);
            return;
        }

        // the stones are valid - remove them from the board
        if (setIds.length === 1 && this.unflippedStones.length === stone.setSize) {
            const stones: Stone[] = [...this.unflippedStones];
            stones.forEach((s: Stone) => s.disabled = true);
            this.unflippedStones = [];
            this.disableStones = false;
            setTimeout(() => {
                stones.forEach((s: Stone) => {
                    s.found = true;
                    s.state = StoneState.found;
                });
            }, 400);
        }

        this.validateGame();
    }

    validateGame() {
        const notFound: Stone = this.stones.find((s: Stone) => s.disabled === false);
        if (notFound == null) {
            this.stopGame();
        }
    }
}
