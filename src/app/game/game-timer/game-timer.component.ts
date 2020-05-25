import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

export const enum GAME_TIMER_STATUS {
    START, STOP, PAUSE
}

@Component({
    selector: 'memo-game-timer',
    templateUrl: './game-timer.component.html',
    styleUrls: ['./game-timer.component.scss'],
})
export class GameTimerComponent implements OnInit, OnChanges {

    handler: any = null;
    label: string;
    ms: number = 0;

    @Input()
    status: GAME_TIMER_STATUS = GAME_TIMER_STATUS.STOP;

    @Output()
    tick: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
        this.updateLabel(this.ms);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['status']) {
            switch (changes['status'].currentValue) {
                case GAME_TIMER_STATUS.STOP:
                    this.stopTimer();
                    break;
                case GAME_TIMER_STATUS.START:
                    this.startTimer();
                    break;
            }
        }
    }

    startTimer() {
        if (this.handler == null) {
            this.handler = setInterval(() => {
                this.ms += 10;
                this.tick.emit(this.ms);
                this.updateLabel(this.ms);
            }, 10)
        }
    }

    stopTimer() {
        if (this.handler) {
            clearInterval(this.handler);
        }
    }

    updateLabel(ms: number) {
        let seconds: number = Math.floor(this.ms / 1000);
        let miliseconds: number = Math.floor((this.ms % 1000) / 10);
        this.label = `${seconds}.${miliseconds}`;
    }

}
