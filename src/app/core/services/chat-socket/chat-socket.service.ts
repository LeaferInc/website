import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import io from 'socket.io-client';
import { Observable, fromEvent, of, Subscription, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {
  private socket: BehaviorSubject<SocketIOClient.Socket> = new BehaviorSubject<SocketIOClient.Socket>(null);

  constructor(private authService: AuthService) {}

  init(): Observable<SocketIOClient.Socket> {
    return this.authService.getUserAuth().pipe(
      filter((userAuth) => !!userAuth),
      switchMap((userAuth) => {
        this.socket.next(io(`${environment.socketUrl}/chat`, {
          transportOptions: {
            polling: {
              extraHeaders: {
                Authorization: `Bearer ${userAuth.token}`,
              },
            },
          },
        }));
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

  on<T = unknown>(event: string): Observable<T> {
    return this.socket.pipe(
      filter(() => !!this.socket.getValue()),
      switchMap(() => fromEvent<T>(this.socket.getValue(), event))
    );
  }

  disconnect(): void {
    this.socket.getValue().disconnect();
  }
}
