import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { User } from './shared/models/user/user';
import { UserAuth } from './shared/models/auth/auth';
import { AppService } from './core/services/app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Leafer';

  constructor(
    public authService: AuthService,
    public appService: AppService,
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
  }
}
