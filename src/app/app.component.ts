import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { User } from './shared/models/user/user';
import { UserAuth } from './shared/models/auth/auth';
import { AppService } from './core/services/app/app.service';
import { NotificationService } from './core/services/notification/notification.service';
import { switchMap, filter } from 'rxjs/operators';
import { Notification } from './shared/models/notification/notification';
import { NotificationSocketService } from './core/services/notification-socket/notification-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Leafer';
  dateNotif = new Date();

  public notificationsUser: Notification[] = [];

  public newNotificationCount: number = 0;

  constructor(
    public authService: AuthService,
    public appService: AppService,
    public notificationService: NotificationService,
    public notificationSocketService: NotificationSocketService,
  ) {}

  ngOnInit() {
    const token = this.authService.getTokenFromLocalStorage();
    if(token) {
      this.authService
        .getUserFromToken(token)
        .subscribe((user: User) => {
          const userAuth: UserAuth = {
            token: token,
            user: user
          };

          this.authService.setUserAuth(userAuth);
        });
    }

    this.authService.isLogged().pipe(
      filter((isLogged) => isLogged === true),
      switchMap(() => this.notificationService.findNotificationByUser())
    ).subscribe((notification) => {
      this.notificationsUser = notification.items;
    });

    this.notificationSocketService.init().subscribe({
      next: (socket) => {
        this.notificationSocketService.on('init').subscribe((message) => {
          console.log('[Client Notification]', message);
        });

        this.notificationSocketService.on('disconnect').subscribe((message) => {
          console.log('[Client Notification]', message);
        });

        this.notificationSocketService.on('onNotification').subscribe((notification: Notification) => {
          console.log('[Client Notification]', notification);
          this.newNotificationCount++;
          this.notificationsUser.push(notification);
        });
      }
    });

  }

  onNotificationClick() {
    this.newNotificationCount = 0;
  }
}
