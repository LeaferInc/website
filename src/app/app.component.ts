import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { User } from './shared/models/user/user';
import { UserAuth } from './shared/models/auth/auth';
import { AppService } from './core/services/app/app.service';
import { NotificationService } from './core/services/notification/notification.service';
import { switchMap, filter } from 'rxjs/operators';
import { Notification } from './shared/models/notification/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Leafer';
  dateNotif = new Date();

  public notificationsUser: Notification[] = [];

  constructor(
    public authService: AuthService,
    public appService: AppService,
    public notificationService: NotificationService,
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

  }
}
