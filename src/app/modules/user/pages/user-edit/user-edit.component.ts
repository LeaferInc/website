import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User, UserEdit } from 'src/app/shared/models/user/user';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { UploadFile } from 'ng-zorro-antd/upload';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  userAuth: UserAuth; // The current user
  userForm: FormGroup;
  submitted: boolean = false; // True if the form has been submitted
  newAvatar: UploadFile; // The selected avatar image file

  private sub: Subscription = new Subscription();

  constructor(private authService: AuthService, public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.sub.add(
      this.authService.getUserAuth().subscribe(
        (userAuth: UserAuth) => {
          this.userAuth = userAuth;
          const dateInput: string = userAuth.user.birthdate ? userAuth.user.birthdate.toISOString().slice(0, 10) : '';

          this.userForm = new FormGroup({
            firstname: new FormControl(userAuth.user.firstname ?? ''),
            lastname: new FormControl(userAuth.user.lastname ?? ''),
            birthdate: new FormControl(dateInput),
            location: new FormControl(userAuth.user.location ?? ''),
            biography: new FormControl(userAuth.user.biography ?? ''),
          });
        },
        (e) => {
          console.log(e);
        }
      )
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Submit the form to the server to update a user.
   * Only submit changed field
   */
  async submit(): Promise<void> {
    const changes: UserEdit = this.userForm.value;

    // Keep only changed fields
    for (let k in changes) {
      if (!changes[k] || changes[k] === this.userAuth.user[k]) {
        delete changes[k];
      }
    }

    // Handle date
    if (this.userForm.get('birthdate').value) {
      const birth = new Date(this.userForm.get('birthdate').value); // Parse input field
      if (this.userAuth.user.birthdate.getTime() !== birth.getTime()) {
        changes.birthdate = birth;
      } else {
        delete changes.birthdate;
      }
    }

    // Handle avatar
    if (this.newAvatar) {
      changes.picture = await UtilsService.toBase64(this.newAvatar);
    }

    if (Object.keys(changes).length === 0) {
      // No changes done => redirect to profile
      this.router.navigate(['users', 'me']);
    } else {
      this.submitted = true;
      this.sub.add(
        this.userService.updateProfile(changes).subscribe(
          (user: User) => {
            // Update provider and redirect
            this.userAuth.user = user;
            this.authService.setUserAuth({ user: user, token: this.userAuth.token });
            this.router.navigate(['users', 'me']);
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            this.submitted = false;
          }
        )
      );
    }
  }
}
