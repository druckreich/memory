import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountdownComponent } from './countdown.component';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
