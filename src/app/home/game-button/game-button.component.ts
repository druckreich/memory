import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameMode, GameModeWithHighscore, Highscore} from '@state/main.models';
import {Store} from '@ngxs/store';
import {FirebaseService} from '@state/firebase.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'memo-game-button',
    templateUrl: './game-button.component.html',
    styleUrls: ['./game-button.component.scss'],
})
export class GameButtonComponent implements OnInit {

    @Input()
    game: GameModeWithHighscore;

    @Output()
    click: EventEmitter<GameMode> = new EventEmitter<GameMode>();

    highscore$: Observable<Highscore[]>;

    constructor(public store: Store, public firebaseService: FirebaseService) {

    }

    ngOnInit() {
        this.highscore$ = this.firebaseService.getHighscore(this.game.id, true, 3);
    }

    onClick() {
        this.click.emit(this.game);
    }
}
