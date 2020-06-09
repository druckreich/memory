import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {GameStoneComponent} from './game-stone.component';

describe('GameStoneComponent', () => {
    let component: GameStoneComponent;
    let fixture: ComponentFixture<GameStoneComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GameStoneComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(GameStoneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
