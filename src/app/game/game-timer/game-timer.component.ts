import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

export const enum GAME_TIMER_STATUS {
    START, STOP, RESET
}

@Component({
    selector: 'memo-game-timer',
    templateUrl: './game-timer.component.html',
    styleUrls: ['./game-timer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameTimerComponent implements OnInit, OnChanges, OnDestroy {

    counter: number;
    timerRef;
    running = false;

    @Input()
    status: GAME_TIMER_STATUS = GAME_TIMER_STATUS.STOP;

    @Output()
    tick: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
        this.running = false;
        this.counter = 0;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.status) {
            switch (changes.status.currentValue) {
                case GAME_TIMER_STATUS.STOP:
                    this.stop();
                    break;
                case GAME_TIMER_STATUS.START:
                    this.start();
                    break;
                case GAME_TIMER_STATUS.RESET:
                    this.reset();
                    break;
            }
        }
    }

    start() {
        if (!this.running) {
            const startTime = Date.now() - (this.counter || 0);
            this.timerRef = setInterval(() => {
                this.counter = Date.now() - startTime;
                this.tick.emit(this.counter);
            }, 50);
        }
    }

    stop() {
        clearInterval(this.timerRef);
        this.running = false;
    }

    reset() {
        clearInterval(this.timerRef);
        this.running = false;
        this.counter = 0;
    }

    clearTimer() {
    }

    ngOnDestroy() {
        clearInterval(this.timerRef);
    }
}
