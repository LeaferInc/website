import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, fromEvent, of } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import io from 'socket.io-client';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  private socket: SocketIOClient.Socket;

  constructor(private authService: AuthService) {}

  init(): Observable<SocketIOClient.Socket> {
    return new Observable((observer) => {
      this.authService.getUserAuth().pipe(
        filter((userAuth) => (userAuth ? true : false)),
        switchMap((userAuth) => {
          this.socket = io(`${environment.socketUrl}/notification`, {
            transportOptions: {
              polling: {
                extraHeaders: {
                  Authorization: `Bearer ${userAuth.token}`,
                },
              },
            },
          });
          return of(this.socket);
        })
      );
    });
  }

  emit(event: string, arg: any): Observable<unknown> {
    return new Observable((observer) => {
      this.socket.emit(event, arg, (data: any) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  on(event: string): Observable<unknown> {
    return fromEvent(this.socket, event);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}