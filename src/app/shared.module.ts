import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerPipe} from '@app/timer.pipe';
import {TabDirective} from '@app/tab.directive';
import {ImageGame} from '@app/shared/util/image.game';
import {NumberGame} from '@app/shared/util/number.game';


@NgModule({
    declarations: [
        TimerPipe,
        TabDirective
    ],
    exports: [
        TimerPipe,
        TabDirective
    ],
    imports: [],
    providers: [

    ]
})
export class SharedModule {
}
