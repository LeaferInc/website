import { TestBed } from '@angular/core/testing';

import { SocketioService } from './socketio.service';
import { AuthService } from '../auth/auth.service';

describe('SocketioService', () => {
  let service: SocketioService;
  const authServiceMock = {
    getUserAuth: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    service = TestBed.inject(SocketioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
