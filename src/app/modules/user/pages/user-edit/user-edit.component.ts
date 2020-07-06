import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User, UserEdit } from 'src/app/shared/models/user/user';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userAuth: UserAuth; // The current user
  userForm: FormGroup;
  submitted: boolean = false; // True if the form has been submitted
  newAvatar: UploadFile;

  constructor(private authService: AuthService, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
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
    );
  }

  /**
   * Submit the form to the server to update a user.
   * Only submit changed field
   */
  submit(): void {
    const changes: UserEdit = this.userForm.value;

    // Parse date
    if (this.userForm.get('birthdate').value) {
      changes.birthdate = new Date(this.userForm.get('birthdate').value);
    }

    // Keep only changed fields
    for (let k in changes) {
      if (!changes[k] || changes[k] === this.userAuth.user[k]) {
        delete changes[k];
      }
    }

    if (Object.keys(changes).length === 0) {
      // No changes done => redirect to profile
      this.router.navigate(['users', 'me']);
    } else {
      this.submitted = true;
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
      );
    }
  }
}
