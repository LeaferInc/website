import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import io from 'socket.io-client';
import { Observable, fromEvent, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: SocketIOClient.Socket;

  constructor(
    private authService: AuthService
  ) { }

  init(): Observable<SocketIOClient.Socket> {
    return new Observable((observer) => {
      this.authService
      .getUserAuth()
      .subscribe(userAuth => {
        this.socket = io(`${environment.socketUrl}/chat`, { query: `userId=${userAuth.user.id}` });
        observer.next(this.socket);
        observer.complete();
      })
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
