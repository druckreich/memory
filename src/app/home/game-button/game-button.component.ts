import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameMode} from "../../state/main.models";
import {Store} from "@ngxs/store";

@Component({
    selector: 'memo-game-button',
    templateUrl: './game-button.component.html',
    styleUrls: ['./game-button.component.scss'],
})
export class GameButtonComponent {

    @Input()
    game: GameMode;

    @Output()
    click: EventEmitter<GameMode> = new EventEmitter<GameMode>();

    constructor(public store: Store) {

    }

    onClick() {
        this.click.emit(this.game);
    }
}
