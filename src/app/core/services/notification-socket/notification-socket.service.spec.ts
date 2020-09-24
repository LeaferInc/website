import { TestBed } from '@angular/core/testing';

import { NotificationSocketService } from './notification-socket.service';
import { AuthService } from '../auth/auth.service';

describe('NotificationSocketService', () => {
  let service: NotificationSocketService;
  const authServiceMock = {
    getUserAuth: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    service = TestBed.inject(NotificationSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
