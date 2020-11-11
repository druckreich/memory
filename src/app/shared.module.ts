import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerPipe} from '@app/timer.pipe';
import {TabDirective} from '@app/tab.directive';


@NgModule({
    declarations: [
        TimerPipe,
        TabDirective
    ],
    exports: [
        TimerPipe,
        TabDirective
    ],
    imports: []
})
export class SharedModule {
}
