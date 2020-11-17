import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Game, Highscore} from '@state/game.models';
import {combineLatest, Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {FirebaseService} from '@state/firebase.service';
import {map, tap} from 'rxjs/operators';

@Component({
    selector: 'memo-game-highscore-modal',
    templateUrl: './game-highscore-modal.component.html',
    styleUrls: ['./game-highscore-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameHighscoreModalComponent implements OnInit, OnChanges {

    @Input()
    game: Game;

    @Input()
    time: number;

    @Input()
    moves: number;

    public remoteHighscore$: Observable<Highscore[]>;
    public localHighscore$: Observable<Highscore> = this.firebaseService.highscore$;
    public isLocalScoreInTopTen$: Observable<boolean>;

    constructor(public firebaseService: FirebaseService,
                public modalController: ModalController) {
    }

    ngOnInit() {
        this.remoteHighscore$ = this.firebaseService.getHighscore(this.game, true, 10);
        if (this.time) {
            this.firebaseService.setHighscore(this.game, this.time, this.moves);
        }

        this.isLocalScoreInTopTen$ = combineLatest([this.remoteHighscore$, this.localHighscore$]).pipe(
            tap(console.log),
            map(([remoteHighscore, localHiscore]) =>
                !!remoteHighscore.find((h: Highscore) => h.id === localHiscore.id)
            ),
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    onStart(): void {
        this.modalController.dismiss('start');
    }

    onMain(): void {
        this.modalController.dismiss('main');
    }

    isUser() {
        return true;
    }
}
