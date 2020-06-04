import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'memo-game-countdown',
    templateUrl: './game-countdown.component.html',
    styleUrls: ['./game-countdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCountdownComponent implements OnInit {

    @Output()
    start: EventEmitter<any> = new EventEmitter<any>();

    handler: any;
    label: string;

    constructor() {
    }

    ngOnInit() {
        let countdown: number = 3;
        this.label = countdown.toString();
        this.handler = setInterval((counter) => {
            countdown--;
            this.label = countdown.toString();
            if (countdown == 0) {
                this.label = "Go";
                clearInterval(this.handler);
                setTimeout(() => this.start.emit(), 750);
            }
        }, 750)
    }

}
