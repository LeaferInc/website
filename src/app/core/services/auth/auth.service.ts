import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAuth } from 'src/app/shared/models/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userAuth: BehaviorSubject<UserAuth> = new BehaviorSubject<UserAuth>({} as UserAuth);

  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string) {
    return this.http.post<UserAuth>('auth/login', { username: username, password: password })
      .pipe(
        map(userAuth => {
          this.userAuth.next(userAuth);
          return userAuth;
        })
      );
  }

  /**
   * Not yet implemented
   */
  logout() {
    throw new Error('Not yet implemented');
  }
}
