import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id && Number.isInteger(Number.parseInt(params.id))) {
        this.userService.getProfile(params.id).subscribe(
          (user: User) => {
            this.user = user;
          },
          (err: HttpErrorResponse) => {
            console.log('redirect');
            console.log(err);

            if (err.status === 404) {
              this.router.navigate(['/404']);
            }
          });
      } else {
        this.router.navigate(['/404']);
      }
    });
  }
}
