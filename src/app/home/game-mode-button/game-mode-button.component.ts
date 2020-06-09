import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameMode} from '@state/main.models';

@Component({
    selector: 'memo-game-mode-button',
    templateUrl: './game-mode-button.component.html',
    styleUrls: ['./game-mode-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameModeButtonComponent implements OnInit {

    @Input()
    gameMode: GameMode;

    constructor() {

    }

    ngOnInit() {

    }
}
