import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../../services/auth/auth.service';

describe('AuthInterceptor', () => {

  const authServiceMock = {
    getTokenFromLocalStorage: jest.fn()
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptor,
      { provide: AuthService, useValue: {} }
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
