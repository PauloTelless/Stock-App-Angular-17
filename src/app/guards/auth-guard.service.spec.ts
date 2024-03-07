import { AuthService } from './../services/auth/auth.service';
import { TestBed } from '@angular/core/testing';

describe('AuthGuardService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
