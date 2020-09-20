import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { User } from 'src/app/shared/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly AUTH_URL = 'auth';
  private userAuth: BehaviorSubject<UserAuth> = new BehaviorSubject<UserAuth>(null);

  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string) {
    return this.http.post<UserAuth>(`${AuthService.AUTH_URL}/login`, { username: username, password: password })
      .pipe(
        map(userAuth => {
          userAuth.user.birthdate = new Date(userAuth.user.birthdate); // Parse date
          localStorage.setItem('token', userAuth.token);
          this.userAuth.next(userAuth);
          return userAuth;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.userAuth.next(null);
  }

  getUserAuth(): Observable<UserAuth> {
    return this.userAuth.asObservable();
  }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem('token');
  }

  getUserFromToken(token: string): Observable<User> {
    return this.http.get<User>(`${AuthService.AUTH_URL}/me`)
      .pipe(map((user: User) => {
        user.birthdate = new Date(user.birthdate); // Parse date
        return user;
      }));
  }

  setUserAuth(userAuth: UserAuth): void {
    this.userAuth.next(userAuth);
  }

  setUserPremium(premium: boolean): void {
    const currentUserAuth = this.userAuth.value;

    const currentUser = {...currentUserAuth.user, ...{ premium: true }};

    const newUserAuth: UserAuth = {
      token: currentUserAuth.token,
      user: currentUser
    };

    const mergedUserAuth = { ...currentUserAuth, ...newUserAuth };
    this.userAuth.next(mergedUserAuth);
  }

  isLogged(): Observable<boolean> {
    return this.userAuth.pipe(
      map((userAuth) => userAuth ? true : false)
    );
  }
}
