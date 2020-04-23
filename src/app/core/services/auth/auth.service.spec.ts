import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { User } from 'src/app/shared/models/user/user';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login return a response', () => {

    const username = 'test';
    const password = 'test';

    const user: User = {
      id: 0,
      username: 'test',
      email: 'test@test.com'
    };

    const token = "un_magnifique_token";

    const userAuth: UserAuth = {
      user: user,
      token: token
    };

    service.login(username, password).subscribe((e: UserAuth) => {
      expect(e).toBeTruthy();
      expect(e).toEqual(userAuth);
      expect(service.userAuth.getValue()).toEqual(userAuth);
    });

    const req: TestRequest = httpMock.expectOne(`${AuthService.AUTH_URL}/login`);
    req.flush(userAuth);
    expect(req.request.method).toBe('POST');

    httpMock.verify();
  });
});
