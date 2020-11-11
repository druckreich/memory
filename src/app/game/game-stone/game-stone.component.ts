import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stone, StoneDimension, StoneState} from '@state/game.models';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {produce} from 'immer';

@Component({
    selector: 'memo-game-stone',
    templateUrl: './game-stone.component.html',
    styleUrls: ['./game-stone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
    dimension: StoneDimension;

    @Input()
    disabled: boolean;

    @Output()
    tabbed: EventEmitter<Stone> = new EventEmitter<Stone>();

    @Output()
    unflipped: EventEmitter<Stone> = new EventEmitter();

    @Output()
    flipped: EventEmitter<Stone> = new EventEmitter();

    @Output()
    found: EventEmitter<Stone> = new EventEmitter();

    constructor(public cd: ChangeDetectorRef) {
    }

    ngOnInit() {

    }

    onAnimationEvent($event) {
        if ($event.toState === 'unflipped' && $event.phaseName === 'done') {
            this.unflipped.emit(this.stone);
        }

        if ($event.toState === 'flipped' && $event.phaseName === 'done') {
            this.flipped.emit(this.stone);
        }

        if ($event.toState === 'found' && $event.phaseName === 'done') {
            this.found.emit(this.stone);
        }
    }

    onStoneTabbed() {
        if (this.disabled === false && this.stone.found === false) {
            if (this.stone.flipped === true) {
                this.stone = produce(this.stone, draft => {
                    draft.flipped = false;
                    draft.state = StoneState.unflipped;
                });
                this.tabbed.emit(this.stone);
                this.cd.detectChanges();
            }
        }
    }
}
