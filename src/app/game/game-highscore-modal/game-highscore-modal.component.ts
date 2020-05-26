import {Component, Input, OnInit} from '@angular/core';
import {GameMode, Highscore} from '@state/main.models';
import {FirebaseService} from '@state/firebase.service';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'memo-game-highscore-modal',
    templateUrl: './game-highscore-modal.component.html',
    styleUrls: ['./game-highscore-modal.component.scss'],
})
export class GameHighscoreModalComponent implements OnInit {

    @Input()
    gameMode: GameMode;

    @Input()
    highscore: Highscore;

    remoteHighscores$: Observable<Highscore[]>;

    placement: number;

    added = false;

    constructor(public modalController: ModalController, public firebaseService: FirebaseService) {
    }

    ngOnInit() {
        this.remoteHighscores$ = this.firebaseService.getHighscore(this.gameMode.id).pipe(
            map((highscores: Highscore[]) => {
                highscores = highscores
                    .sort((a: Highscore, b: Highscore) => a.score - b.score)
                    .slice(0, 10);
                return highscores;
            }),
            tap((highscores: Highscore[]) => {
                console.log(highscores);
                if (highscores.length === 0 || highscores.length < 10) {
                    this.setHighscore();
                } else if (this.highscore.score < highscores[highscores.length - 1].score) {
                    this.setHighscore();
                }
            })
        );
    }

    setHighscore(): void {
        if (this.added === false) {
            this.firebaseService.setHighscore(this.gameMode.id, this.highscore).then(data => {
                this.highscore.id = data.id;
            });
            this.added = true;
        }
    }

    onRetry(): void {
        this.modalController.dismiss('retry');
    }

    onMain(): void {
        this.modalController.dismiss('main');
    }
}
