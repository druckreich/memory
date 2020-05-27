import {AfterViewInit, Directive, ElementRef, EventEmitter, NgZone, Output} from '@angular/core';
import {GestureController} from '@ionic/angular';


@Directive({
    selector: '[tab]'
})
export class TabDirective implements AfterViewInit {

    @Output() tab = new EventEmitter();

    constructor(public elementRef: ElementRef, private gestureCtrl: GestureController, private zone: NgZone) {
    }

    ngAfterViewInit() {
        this.loadTabOnElement();
    }

    loadTabOnElement() {
        const gesture = this.gestureCtrl.create({
            el: this.elementRef.nativeElement,
            threshold: 0,
            gestureName: 'tab',
            onStart: ev => this.tabAction()
        });
        gesture.enable(true);
    }

    tabAction(): void {
        this.tab.emit();
    }
}


