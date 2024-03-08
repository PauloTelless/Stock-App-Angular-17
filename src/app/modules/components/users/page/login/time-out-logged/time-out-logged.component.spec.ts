import { ComponentFixture, TestBed } from '@angular/core/testing';

import TimeOutLoggedComponent from './time-out-logged.component';

describe('TimeOutLoggedComponent', () => {
  let component: TimeOutLoggedComponent;
  let fixture: ComponentFixture<TimeOutLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeOutLoggedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeOutLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
