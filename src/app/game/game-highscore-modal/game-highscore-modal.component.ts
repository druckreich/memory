import {Component, Input, OnInit} from '@angular/core';
import {GameMode, GameStats, Highscore} from '@state/main.models';
import {FirebaseService} from '@state/firebase.service';
import {Observable, Subscription} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {map} from 'rxjs/operators';

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

    @Input()
    updateHighscore: boolean;

    @Input()
    stats: GameStats;

    @Input()
    updateGameStats: boolean;

    remoteHighscores$: Observable<Highscore[]>;

    constructor(public modalController: ModalController, public firebaseService: FirebaseService) {
    }

    ngOnInit() {
        this.loadUserStats();
        this.loadHighscores();
    }

    loadUserStats() {
        const subscription: Subscription = this.firebaseService.getUserStats(this.gameMode.id).subscribe(
            (stats: GameStats) => {
                if (!this.updateGameStats) {
                    this.setUserStats(stats);
                }
                subscription.unsubscribe();
            });
    }

    setUserStats(stats: GameStats) {
        /*
        stats.completed = stats.completed ? stats.completed++ : 0;
        this.firebaseService.setUserStats(this.gameMode.id, stats);
        console.log(stats);
         */
    }

    loadHighscores(): void {
        let highscores$ = this.firebaseService.getHighscore(this.gameMode.id, true, 10);
        if (this.updateHighscore) {
            highscores$ = highscores$.pipe(
                map((highscores: Highscore[]) => {
                    return this.setHighscore(highscores, this.highscore);
                })
            );
        }
        this.remoteHighscores$ = highscores$;
    }

    setHighscore(highscores: Highscore[], highscore: Highscore): Highscore[] {
        if (highscores.length === 0 || highscores.length < 10 || this.highscore.score < highscores[highscores.length - 1].score) {
            this.firebaseService.setHighscore(this.gameMode.id, this.highscore).then(data => {
                this.highscore.id = data.id;
            });
            highscores.push(highscore);
            highscores = highscores.sort((a: Highscore, b: Highscore) => a.score - b.score);
        }
        return highscores;
    }

    onRetry(): void {
        this.modalController.dismiss('retry');
    }

    onMain(): void {
        this.modalController.dismiss('main');
    }
}
