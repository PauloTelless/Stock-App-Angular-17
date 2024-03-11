import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRegisterCredentialsComponent } from './error-register-credentials.component';

describe('ErrorRegisterCredentialsComponent', () => {
  let component: ErrorRegisterCredentialsComponent;
  let fixture: ComponentFixture<ErrorRegisterCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorRegisterCredentialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorRegisterCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
