import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { Subscription } from 'rxjs';

/**
 * This class only displays data about the current user
 */
@Component({
  selector: 'app-my-profile',
  templateUrl: './my.profile.component.html',
  styleUrls: ['./my.profile.component.scss'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  user: User = null; // The current user
  isModalVisible: boolean = false; // Weither or not the modal should be displayed

  private sub: Subscription = new Subscription();

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.sub.add(
      this.userService.getMyProfile().subscribe(
        (user: User) => {
          this.user = user;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Deletes the user account
   */
  deleteAccount(): void {
    this.isModalVisible = false;
    this.sub.add(
      this.userService.deleteAccount().subscribe(
        () => {
          this.authService.logout();
          this.router.navigate(['login']);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    );
  }
}
