import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DailyProcessComponent} from './daily-process.component';

describe('DailyProcessComponent', () => {
  let component: DailyProcessComponent;
  let fixture: ComponentFixture<DailyProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyProcessComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
