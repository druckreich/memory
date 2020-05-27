import {NgModule} from '@angular/core';
import {TimerPipe} from './timer.pipe';
import {TabDirective} from '@app/tab.directive';

@NgModule({
    declarations: [
        TimerPipe,
        TabDirective
    ],
    entryComponents: [],
    imports: [],
    providers: [],
    exports: [
        TimerPipe,
        TabDirective
    ]
})
export class SharedModule {
}
