import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsUserComponent } from './metrics-user.component';

describe('MetricsUserComponent', () => {
  let component: MetricsUserComponent;
  let fixture: ComponentFixture<MetricsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
