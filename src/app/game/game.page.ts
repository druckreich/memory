import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Game, GameStats, Highscore, HighscoreModalProps, Stone, StoneState} from '@state/main.models';
import {GameFacade} from '@state/game.facade';
import {GAME_TIMER_STATUS} from './game-timer/game-timer.component';
import {Store} from '@ngxs/store';
import {ModalController} from '@ionic/angular';
import {GameHighscoreModalComponent} from '@app/game/game-highscore-modal/game-highscore-modal.component';
import {FirebaseService} from '@state/firebase.service';
import {produce} from 'immer';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'memo-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class GamePage {

    public readonly game: Game;

    stones: Stone[] = produce([], draft => {
    });

    unflippedStones: Stone[] = produce([], draft => {
    });

    showStones = false;
    disableStones = false;
    showBackdrop = false;
    showCountdown = false;
    timerStatus: GAME_TIMER_STATUS = GAME_TIMER_STATUS.STOP;
    milliseconds: number;

    public gameStats: GameStats;

    constructor(public activatedRoute: ActivatedRoute,
                public store: Store,
                public firebaseService: FirebaseService,
                public gameFacade: GameFacade,
                public modalController: ModalController) {

        const gameModeId: string = this.activatedRoute.snapshot.params.id;
        this.game = this.gameFacade.getGameById(gameModeId);
    }

    ionViewWillEnter() {
        this.loadGameStats();
    }

    loadGameStats(): void {
        const subscription: Subscription = this.firebaseService.getUserStats(this.game)
            .subscribe((gs: GameStats) => {
                if (gs) {
                    this.gameStats = gs;
                    this.onPageStartUp();
                    subscription.unsubscribe();
                } else {
                    this.firebaseService.setUserStats(this.game, {completed: 0, started: 0, moves: 0});
                }
            });
    }

    onPageStartUp() {
        const props: HighscoreModalProps = {
            game: this.game.gameMode,
            showedAfterGame: false,
            highscore$: this.getHighscore(),
            localHighscore$: null
        };
        this.showHighscoreModal(props);
    }

    async showHighscoreModal(props: HighscoreModalProps) {
        const modal = await this.modalController.create({
            component: GameHighscoreModalComponent,
            cssClass: 'highscore',
            componentProps: props
        });
        modal.onDidDismiss().then((data) => {
            if (data.data === 'start') {
                this.prepareGame();
            }
            if (data.data === 'main') {
                this.gameFacade.navigateToMenu();
            }
        });
        return await modal.present();
    }

    private prepareGame(): void {
        this.timerStatus = GAME_TIMER_STATUS.RESET;
        this.gameFacade.createStones(this.game).subscribe((stones: Stone[]) => {
            this.stones = produce([], draft => draft = stones);
            this.startGame();
        });
    }

    private startGame(): void {
        this.showStones = true;
        this.showBackdrop = false;
        this.disableStones = false;
        this.showCountdown = false;
    }

    private stopGame(): void {
        this.showBackdrop = true;
        this.disableStones = true;
        this.showCountdown = false;
        this.timerStatus = GAME_TIMER_STATUS.STOP;

        this.gameStats.completed++;
        this.updateGameStats(this.gameStats);

        this.showHighscoreModal({
            game: this.game.gameMode,
            showedAfterGame: true,
            highscore$: this.getHighscore(),
            localHighscore$: this.updateHighscore(this.milliseconds)
        });
    }

    private onTick(ms: number) {
        this.milliseconds = ms;
    }

    private onStoneTabbed(stone: Stone): void {
        if (this.timerStatus !== GAME_TIMER_STATUS.START) {
            this.timerStatus = GAME_TIMER_STATUS.START;
            this.gameStats.started++;
        }
        this.unflippedStones = produce(this.unflippedStones, draft => {
            draft.push(stone);
        });
        if (this.unflippedStones.length === this.game.setSize) {
            this.gameStats.moves++;
            this.disableStones = true;
        }
    }

    onStoneFound(stone: Stone): void {
    }

    onStoneFlipped(stone: Stone): void {
    }

    // flip animation ends
    onStoneUnflipped(stone: Stone): void {
        if (this.unflippedStones.length < this.game.setSize) {
            return;
        }

        const setIds: string[] = this.unflippedStones
            .map((s: Stone) => s.setId)
            .filter((value, index, self) => self.indexOf(value) === index);

        // the stones are invalid - flip it back
        if (setIds.length > 1) {
            const stonesToUpdate: Stone[] = produce(this.unflippedStones, draft => {
                draft.map((d) => {
                    d.flipped = true;
                    d.state = StoneState.flipped;
                });
            });
            this.unflippedStones = [];
            setTimeout(() => {
                this.updateStones(stonesToUpdate);
                this.disableStones = false;
            }, 400);
            return;
        }

        // the stones are valid - remove them from the board
        if (setIds.length === 1 && this.unflippedStones.length === stone.setSize) {
            const stonesToUpdate: Stone[] = produce(this.unflippedStones, draft => {
                draft.map((d) => {
                    d.disabled = true;
                    d.found = true;
                    d.state = StoneState.found;
                });
            });
            this.unflippedStones = [];
            this.disableStones = false;
            setTimeout(() => {
                this.updateStones(stonesToUpdate);
                this.validateGame();
            }, 400);
        }

        this.validateGame();
    }

    private updateStones(stones: Stone[]) {
        this.stones = produce(this.stones, (draft: Stone[]) => {
            stones.forEach((s: Stone) => {
                const index: number = this.stones.findIndex((value: Stone) => value.id === s.id);
                draft[index] = s;
            });
        });
    }

    private validateGame() {
        const notFound: Stone = this.stones.find((s: Stone) => s.disabled === false);
        if (notFound == null) {
            this.stopGame();
        }
    }

    numberToArray(counter: number): number[] {
        return new Array(counter);
    }

    matrixToIndex(ri: number, ci: number): number {
        return this.game.rows
            .slice(0, ri)
            .reduce((total, currentValue, currentIndex, array) => {
                return total + currentValue;
            }, 0) + ci;
    }

    getHighscore(): Observable<Highscore[]> {
        return this.firebaseService.getHighscore(this.game, true, 10);
    }

    updateHighscore(milliseconds: number): Promise<Highscore> {
        return this.firebaseService.setHighscore(this.game, milliseconds);
    }

    updateGameStats(stats: GameStats): Observable<GameStats> {
        return this.firebaseService.updateGameStats(this.game, stats);
    }
}
