import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, fromEvent, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import io from 'socket.io-client';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  private socket: BehaviorSubject<SocketIOClient.Socket> = new BehaviorSubject<SocketIOClient.Socket>(null);

  constructor(private authService: AuthService) {}

  init(): Observable<SocketIOClient.Socket> {
    return this.authService.getUserAuth().pipe(
      filter((userAuth) => (userAuth ? true : false)),
      switchMap((userAuth) => {
        this.socket.next(
          io(`${environment.socketUrl}/notification`, {
            transportOptions: {
              polling: {
                extraHeaders: {
                  Authorization: `Bearer ${userAuth.token}`,
                },
              },
            },
          })
        );
        return this.socket.asObservable();
      })
    );
  }

  emit(event: string, arg: any): Observable<unknown> {
    return new Observable((observer) => {
      this.socket.getValue().emit(event, arg, (data: any) => {
        observer.next(data);
      });
    });
  }

  on(event: string): Observable<unknown> {
    return this.socket.pipe(
      filter(() => !!this.socket.getValue()),
      switchMap(() => fromEvent(this.socket.getValue(), event))
    );
  }

  disconnect(): void {
    this.socket.getValue().disconnect();
  }
}
