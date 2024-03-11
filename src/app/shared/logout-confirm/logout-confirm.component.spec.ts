import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutConfirmComponent } from './logout-confirm.component';

describe('LogoutConfirmComponent', () => {
  let component: LogoutConfirmComponent;
  let fixture: ComponentFixture<LogoutConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoutConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
