import { TestBed } from '@angular/core/testing';

import { ChatSocketService } from './chat-socket.service';
import { AuthService } from '../auth/auth.service';

describe('ChatSocketService', () => {
  let service: ChatSocketService;
  const authServiceMock = {
    getUserAuth: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    service = TestBed.inject(ChatSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
