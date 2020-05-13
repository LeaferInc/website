import { TestBed } from '@angular/core/testing';

import { AuthenticateGuard } from './authenticate.guard';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

describe('AuthenticateGuard', () => {
  let guard: AuthenticateGuard;
  const authServiceMock = {
    isLogged: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: {} },
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    guard = TestBed.inject(AuthenticateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
