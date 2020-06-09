import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameSelectPage } from './game-select.page';

describe('GameSelectPage', () => {
  let component: GameSelectPage;
  let fixture: ComponentFixture<GameSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
