import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {GameCountdownComponent} from './game-countdown.component';

describe('GameCountdownComponent', () => {
    let component: GameCountdownComponent;
    let fixture: ComponentFixture<GameCountdownComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GameCountdownComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(GameCountdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
