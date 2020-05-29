import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameMode, Highscore, HighscoreModalProps, Stone, StoneState} from '@state/main.models';
import {GameService} from '@state/game.service';
import {GAME_TIMER_STATUS} from './game-timer/game-timer.component';
import {Store} from '@ngxs/store';
import {ModalController} from '@ionic/angular';
import {GameHighscoreModalComponent} from '@app/game/game-highscore-modal/game-highscore-modal.component';
import {Navigate} from '@ngxs/router-plugin';
import {FirebaseService} from '@state/firebase.service';

@Component({
    selector: 'memo-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

    stones: Stone[];
    unflippedStones: Stone[] = [];

    gameMode: GameMode;
    showStones = false;
    disableStones = false;
    showBackdrop = false;
    showCountdown = false;
    timerStatus: GAME_TIMER_STATUS = GAME_TIMER_STATUS.STOP;
    milliseconds: number;

    constructor(public activatedRoute: ActivatedRoute,
                public store: Store,
                public firebaseService: FirebaseService,
                public gameService: GameService,
                public modalController: ModalController) {
    }

    ngOnInit() {

        const gameModeId: string = this.activatedRoute.snapshot.params.id;
        this.gameMode = this.gameService.getGameModeById(gameModeId);

        // set up user stats for this game mode
        this.firebaseService.setUserStatsIfNotExists(this.gameMode.id);

        const props: HighscoreModalProps = {
            gameMode: this.gameMode,
            updateGameStats: true,
            updateHighscore: false
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

    async showHighscoreModal(props: HighscoreModalProps, dismissHandler: any) {
        const modal = await this.modalController.create({
            component: GameHighscoreModalComponent,
            cssClass: 'highscore',
            componentProps: props
        });
        modal.onDidDismiss().then((data) => dismissHandler(data));
        return await modal.present();
    }

    getArray(counter: number) {
        return new Array(counter);
    }

    getIndex(ri: number, ci: number): number {
        return this.gameMode.rows
            .slice(0, ri)
            .reduce((total, currentValue, currentIndex, array) => {
                return total + currentValue;
            }, 0) + ci;
   }

    prepareGame(): void {
        this.timerStatus = GAME_TIMER_STATUS.RESET;
        this.gameService.createStones(this.gameMode).subscribe((stones: Stone[]) => {
            this.stones = stones;
            this.startGame();
        });
    }

    startCountdown(): void {
        this.showStones = true;
        this.showBackdrop = true;
        this.showCountdown = true;
    }

    startGame(): void {
        this.showStones = true;
        this.showBackdrop = false;
        this.disableStones = false;
        this.showCountdown = false;
    }

    stopGame(): void {
        this.showBackdrop = true;
        this.disableStones = true;
        this.showCountdown = false;
        this.timerStatus = GAME_TIMER_STATUS.STOP;

        const props: HighscoreModalProps = {
            gameMode: this.gameMode,
            highscore: {score: this.milliseconds} as Highscore,
            updateHighscore: true,
            updateGameStats: true
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
        if (this.timerStatus !== GAME_TIMER_STATUS.START) {
            this.timerStatus = GAME_TIMER_STATUS.START;
        }

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
