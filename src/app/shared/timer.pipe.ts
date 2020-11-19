import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timer'
})
export class TimerPipe implements PipeTransform {

    transform(value: number, exponent?: number): string {

        let minutes: any = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
        let seconds: any = Math.floor((value % (1000 * 60)) / 1000);
        let milliseconds: any = Math.floor(value % 1000);

        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? '00' + milliseconds : '0' + milliseconds : milliseconds;
        return minutes + ':' + seconds + ':' + milliseconds;
    }

}
