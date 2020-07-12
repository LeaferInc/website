import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { Role } from 'src/app/shared/models/user/user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService
        .getUserAuth()
        .pipe(
          switchMap((userAuth: UserAuth) => {
            return userAuth.user.role === Role.ADMIN ? of(true) : of(false);
          })
        );
  }
}
