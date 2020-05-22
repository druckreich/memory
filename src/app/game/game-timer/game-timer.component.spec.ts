import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameTimerComponent } from './game-timer.component';

describe('GameTimerComponent', () => {
  let component: GameTimerComponent;
  let fixture: ComponentFixture<GameTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTimerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
