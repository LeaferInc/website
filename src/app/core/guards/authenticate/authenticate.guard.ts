import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { switchMap, mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService
        .isLogged()
        .pipe(
          map((isLogged) => {
            if(isLogged) {
              return true;
            } else {
              return this.router.parseUrl('/login');
            }
          })
        );
  }
  
}
