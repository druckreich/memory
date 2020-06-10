import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Game} from '@state/main.models';

@Component({
    selector: 'memo-game-button',
    templateUrl: './game-button.component.html',
    styleUrls: ['./game-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameButtonComponent implements OnInit {

    @Input()
    game: Game;

    constructor() {

    }

    ngOnInit() {

    }
}
