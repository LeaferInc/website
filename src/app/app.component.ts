import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { User } from './shared/models/user/user';
import { UserAuth } from './shared/models/auth/auth';
import { AppService } from './core/services/app/app.service';
import { NotificationService } from './core/services/notification/notification.service';
import { switchMap, filter, map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Notification } from './shared/models/notification/notification';
import { NotificationSocketService } from './core/services/notification-socket/notification-socket.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Leafer';
  dateNotif = new Date();

  public notificationsUser: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);

  // public notificationsUser: Notification[] = [];

  public unreadNotificationCount: number = 0;

  private temporyNotificationJustRead: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);

  constructor(
    public authService: AuthService,
    public appService: AppService,
    public notificationService: NotificationService,
    public notificationSocketService: NotificationSocketService,
    private router: Router,
  ) {}

  ngOnInit() {
    const token = this.authService.getTokenFromLocalStorage();
    if (token) {
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
      switchMap(() => this.notificationService.findNotificationByUser()),
    ).subscribe((notifications) => {
      this.notificationsUser.next(notifications.items);
      notifications.items.forEach((notification) => {
        if (!notification.read) {
          this.unreadNotificationCount++;
        }
      });
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
          this.unreadNotificationCount++;
          // this.notificationsUser.unshift(notification);
          this.notificationsUser.next([notification, ...this.notificationsUser.getValue()])
        });
      }
    });

    this.temporyNotificationJustRead
      .pipe(
        filter((notifications) => notifications.length !== 0),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((notifications) => {
          const notificationsId = notifications.map((notification) => notification.id);
          return this.notificationService.readNotification(notificationsId);
        })
      )
      .subscribe({
        next: (notifications) => {
          // this.notificationsUser.forEach((notification, index, array) => {
          //   const notificationIndex = notifications.findIndex((notificationTmp) => notificationTmp.id === notification.id)
          //   if(notificationIndex >= 0) {
          //     this.notificationsUser[index] = notifications[notificationIndex];
          //   }
          // });
        }
      });

  }

  onMouseEnterNotification(notification: Notification) {
    if(!notification.read) {
      const alreadyInArray = this.temporyNotificationJustRead.getValue().find((notificationTmp) => notificationTmp.id === notification.id);
      if(!alreadyInArray) {
        this.temporyNotificationJustRead.next([...this.temporyNotificationJustRead.getValue(), notification]);
      }
    }
  }

  /**
   * Log out of the app
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
