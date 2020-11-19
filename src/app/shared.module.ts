import {NgModule} from '@angular/core';
import {TimerPipe} from '@app/shared/timer.pipe';
import {TabDirective} from '@app/shared/tab.directive';

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
