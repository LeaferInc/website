import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { User } from './shared/models/user/user';
import { UserAuth } from './shared/models/auth/auth';
import { AppService } from './core/services/app/app.service';
import { Router } from '@angular/router';

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
    private router: Router,
  ) { }

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
  }

  /**
   * Log out of the app
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
