import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {GameModeButtonComponent} from './game-button.component';

describe('GameButtonComponent', () => {
    let component: GameModeButtonComponent;
    let fixture: ComponentFixture<GameModeButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GameModeButtonComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(GameModeButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
