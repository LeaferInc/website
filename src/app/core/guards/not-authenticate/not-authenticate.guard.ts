import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotAuthenticateGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLogged().pipe(
      map((isLogged) => {
        if (isLogged) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
