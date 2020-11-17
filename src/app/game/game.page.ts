import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Game, GameType, HighscoreModalProps, Stone, StoneAnimationState} from '@state/game.models';
import {GameFacade} from '@state/game.facade';
import {GAME_TIMER_STATUS} from './game-timer/game-timer.component';
import {Store} from '@ngxs/store';
import {ModalController} from '@ionic/angular';
import {GameHighscoreModalComponent} from '@app/game/game-highscore-modal/game-highscore-modal.component';
import {FirebaseService} from '@state/firebase.service';
import {produce} from 'immer';
import {DestroyableComponent} from '@app/shared/destroyable/destroyable.component';
import {takeUntil} from 'rxjs/operators';
import {ImageGame} from '@app/shared/util/image.game';
import {NumberGame} from '@app/shared/util/number.game';

@Component({
    selector: 'memo-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class GamePage extends DestroyableComponent {

    public game: Game;

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

    moves = 0;
    errors = 0;

    constructor(public activatedRoute: ActivatedRoute,
                public store: Store,
                public firebaseService: FirebaseService,
                public gameFacade: GameFacade,
                public modalController: ModalController) {
        super();
        const gameModeId: string = this.activatedRoute.snapshot.params.id;
        this.game = this.gameFacade.getGameById(gameModeId);
    }

    ionViewWillEnter() {
        this.onPageStartUp();
    }

    onPageStartUp() {
        this.showHighscoreModal();
    }

    async showHighscoreModal() {
        const modal = await this.modalController.create({
            component: GameHighscoreModalComponent,
            cssClass: 'highscore',
            componentProps: {
                game: this.game,
                moves: this.moves,
                time: this.milliseconds
            } as HighscoreModalProps
        });
        modal.onDidDismiss().then((data) => {
            if (data.data === 'start') {
                this.prepareGame();
            }
            if (data.data === 'main') {
                this.gameFacade.navigateToMenu();
            }
        });
        return modal.present();
    }

    private prepareGame(): void {
        this.timerStatus = GAME_TIMER_STATUS.RESET;
        this.gameFacade.createStones(this.game)
            .pipe(takeUntil(this.destroy$))
            .subscribe((stones: Stone[]) => {
                this.stones = produce([], draft => draft = stones);
                this.startGame();
            });
    }

    public startGame(): void {
        this.showStones = true;
        this.showBackdrop = false;
        this.disableStones = false;
        this.showCountdown = false;
        this.moves = 0;
        this.timerStatus = GAME_TIMER_STATUS.RESET;
    }

    private stopGame(): void {
        this.showStones = false;
        this.showBackdrop = true;
        this.disableStones = true;
        this.showCountdown = false;
        this.timerStatus = GAME_TIMER_STATUS.STOP;

        this.showHighscoreModal();
    }

    private onTick(ms: number) {
        this.milliseconds = ms;
    }

    private onStoneTabbed(stone: Stone): void {
        // if the game was not started then the first stone was tabbed
        // -> start the timer
        if (this.timerStatus !== GAME_TIMER_STATUS.START) {
            this.timerStatus = GAME_TIMER_STATUS.START;
            this.milliseconds = 0;
        }
        this.unflippedStones = produce(this.unflippedStones, draft => {
            draft.push(stone);
        });
        if (this.unflippedStones.length === this.unflippedStones[0].setSize) {
            this.moves++;
            this.disableStones = true;
        }
    }

    onStoneFound(stone: Stone): void {
    }

    onStoneFlipped(stone: Stone): void {
    }

    /**
     * Trigged by the template when the stone unflip animation has finished
     * @param stone
     */
    onStoneUnflipped(stone: Stone): void {

        // not the correct set size
        if (this.unflippedStones.length === 0 ||
            this.unflippedStones.length < this.unflippedStones[0].setSize) {
            return;
        }

        // check if stones from different same game types have been unflipped
        const setTypes: string[] = this.unflippedStones
            .map((s: Stone) => s.setType)
            .filter((value, index, self) => self.indexOf(value) === index);

        // different game types have been flipped
        if (setTypes.length > 1) {
            this.setUnflippedStonesInvalid();
            return;
        }

        if (stone.setType === GameType.image && !ImageGame.isValid(this.unflippedStones)) {
            this.setUnflippedStonesInvalid();
            return;
        } else if (stone.setType === GameType.number && !NumberGame.isValid(this.unflippedStones)) {
            this.setUnflippedStonesInvalid();
            return;
        }

        this.setUnflippedStonesValid();
        this.validateGame();
    }

    private setUnflippedStonesValid(): void {
        const stonesToUpdate: Stone[] = produce(this.unflippedStones, draft => {
            draft.map((d) => {
                d.disabled = true;
                d.found = true;
                d.state = StoneAnimationState.found;
            });
        });
        this.unflippedStones = [];
        this.disableStones = false;
        setTimeout(() => {
            this.updateStones(stonesToUpdate);
            this.validateGame();
        }, 400);
    }


    private setUnflippedStonesInvalid(): void {
        const stonesToUpdate: Stone[] = produce(this.unflippedStones, draft => {
            draft.map((d) => {
                d.flipped = true;
                d.state = StoneAnimationState.flipped;
            });
        });
        this.unflippedStones = [];
        setTimeout(() => {
            this.updateStones(stonesToUpdate);
            this.disableStones = false;
        }, 400);
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
}
