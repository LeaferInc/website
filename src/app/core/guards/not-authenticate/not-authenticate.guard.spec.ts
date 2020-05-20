import { TestBed } from '@angular/core/testing';

import { NotAuthenticateGuard } from './not-authenticate.guard';
import { AuthService } from '../../services/auth/auth.service';

describe('NotAuthenticateGuard', () => {
  let guard: NotAuthenticateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: {}}
      ]
    });
    guard = TestBed.inject(NotAuthenticateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
