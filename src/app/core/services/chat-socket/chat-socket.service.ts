import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import io from 'socket.io-client';
import { Observable, fromEvent, of, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {
  private socket: SocketIOClient.Socket;
  private sub: Subscription;

  constructor(private authService: AuthService) {}

  init(): Observable<SocketIOClient.Socket> {
    return this.authService.getUserAuth().pipe(
      filter((userAuth) => !!userAuth),
      switchMap((userAuth) => {
        this.socket = io(`${environment.socketUrl}/chat`, {
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
    if (this.sub) this.sub.unsubscribe();
  }
}
