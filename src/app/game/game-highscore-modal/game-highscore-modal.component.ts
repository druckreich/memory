import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Game, Highscore} from '@state/game.models';
import {Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {FirebaseService} from '@state/firebase.service';

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
    timeForThisGame: number;

    public remoteHighscore$: Observable<Highscore[]>;
    public localHighscore$: Observable<Highscore> = this.firebaseService.highscore$;

    constructor(public firebaseService: FirebaseService,
                public modalController: ModalController) {
    }

    ngOnInit() {
        this.remoteHighscore$ = this.firebaseService.getHighscore(this.game, true, 10);
        if (this.timeForThisGame) {
            this.firebaseService.setHighscore(this.game, this.timeForThisGame);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    onStart(): void {
        this.modalController.dismiss('start');
    }

    onMain(): void {
        this.modalController.dismiss('main');
    }
}
