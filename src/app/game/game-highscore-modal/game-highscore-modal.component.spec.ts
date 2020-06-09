import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {GameHighscoreModalComponent} from './game-highscore-modal.component';

describe('GameHighscoreModalComponent', () => {
    let component: GameHighscoreModalComponent;
    let fixture: ComponentFixture<GameHighscoreModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GameHighscoreModalComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(GameHighscoreModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
