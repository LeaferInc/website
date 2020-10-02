import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.local';
import { AuthService } from '../auth/auth.service';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SensorDataSocketService {
  
  private socket: BehaviorSubject<SocketIOClient.Socket> = new BehaviorSubject<SocketIOClient.Socket>(null);

  constructor(private authService: AuthService) {}

  init(): Observable<SocketIOClient.Socket> {
    return this.authService.getUserAuth().pipe(
      filter((userAuth) => (userAuth ? true : false)),
      switchMap((userAuth) => {
        this.socket.next(
          io(`${environment.socketUrl}/sensor`, {
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
