import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, from, Observable } from 'rxjs';
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
          localStorage.setItem('token', userAuth.token);
          this.userAuth.next(userAuth);
          return userAuth;
        })
      );
  }

  /**
   * Not yet implemented
   */
  logout() {
    localStorage.removeItem('token');
    this.userAuth.next(null);
    throw new Error('Not yet implemented');
  }

  getUserAuth(): Observable<UserAuth> {
    return this.userAuth.asObservable();
  }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem('token');
  }

  getUserFromToken(token: string): Observable<User> {
    return this.http.get<User>(`${AuthService.AUTH_URL}/me`);
  }

  setUserAuth(userAuth: UserAuth): void {
    this.userAuth.next(userAuth);
  }

  isLogged(): Observable<boolean> {
    return new Observable((obs) => {
      this.userAuth.subscribe({
        next: (userAuth) => {
          userAuth ? obs.next(true) : obs.next(false);
        }
      });
    });
  }
  
}
