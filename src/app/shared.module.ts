import {NgModule} from '@angular/core';
import {TimerPipe} from './timer.pipe';

@NgModule({
    declarations: [
        TimerPipe
    ],
    entryComponents: [],
    imports: [],
    providers: [],
    exports: [
        TimerPipe
    ]
})
export class SharedModule {
}
