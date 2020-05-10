import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getTokenFromLocalStorage();
    
    let headers: HttpHeaders = request.headers;
    if(token) {
      headers = request.headers.append('Authorization', 'Bearer ' + token);
    }

    const modifiedReq = request.clone({headers: headers});
    return next.handle(modifiedReq);
  }
}
