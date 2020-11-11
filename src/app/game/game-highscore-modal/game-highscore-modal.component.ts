import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GameMode, Highscore} from '@state/game.models';
import {Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'memo-game-highscore-modal',
    templateUrl: './game-highscore-modal.component.html',
    styleUrls: ['./game-highscore-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameHighscoreModalComponent implements OnInit, OnChanges {

    @Input()
    game: GameMode;

    @Input()
    highscore$: Observable<Highscore[]>;

    @Input()
    localHighscore$: Promise<Highscore>;

    @Input()
    showedAfterGame: boolean;

    constructor(public modalController: ModalController) {

    }

    ngOnInit() {
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
