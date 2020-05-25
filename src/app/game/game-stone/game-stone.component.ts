import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stone} from '@state/main.models';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'memo-game-stone',
    templateUrl: './game-stone.component.html',
    styleUrls: ['./game-stone.component.scss'],
    animations: [
        trigger('flip', [
            state('flipped', style({transform: 'rotateY(180deg)'})),
            state('unflipped', style({transform: 'rotateY(0)'})),
            state('found', style({opacity: 0})),
            transition('* => *', animate('250ms ease-in-out'))
        ])
    ]
})
export class GameStoneComponent implements OnInit {

    @Input()
    stone: Stone;

    @Input()
    disabled: boolean;

    @Output()
    clicked: EventEmitter<Stone> = new EventEmitter<Stone>();

    @Output()
    unflipped: EventEmitter<Stone> = new EventEmitter();

    @Output()
    flipped: EventEmitter<Stone> = new EventEmitter();

    @Output()
    found: EventEmitter<Stone> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

    onToggleFlip() {
        this.stone.state = (this.stone.state === 'unflipped') ? 'flipped' : 'unflipped';
    }

    onAnimationEvent($event) {
        if ($event.toState == 'unflipped' && $event.phaseName == 'done') {
            this.unflipped.emit(this.stone);
        }

        if ($event.toState == 'flipped' && $event.phaseName == 'done') {
            this.flipped.emit(this.stone);
        }

        if ($event.toState == 'found' && $event.phaseName == 'done') {
            this.found.emit(this.stone);
        }
    }

    onStoneClicked() {
        if (this.disabled == false) {
            if (this.stone.state === 'flipped') {
                this.onToggleFlip();
            }
            this.clicked.emit(this.stone);
        }
    }

}
