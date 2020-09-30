import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { User } from 'src/app/shared/models/user/user';
import { UserAuth } from 'src/app/shared/models/auth/auth';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an user', () => {

    const user: User = {
      id: 0,
      username: 'test',
      email: 'test@test.com',
      firstname: 'John',
      lastname: 'Doe',
    };

    const password = 'test';

    service.create(user, password).subscribe((e: User) => {
      expect(e).toBeTruthy();
      expect(e).toEqual(user);
    });

    const req: TestRequest = httpMock.expectOne(UserService.USER_URL);
    req.flush(user);
    expect(req.request.method).toBe('POST');

    httpMock.verify();
  });
});
