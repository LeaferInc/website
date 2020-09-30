import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;

  private sub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.sub.add(
      this.route.params
        .pipe(
          filter((params: Params) => params.id && Number.isInteger(Number.parseInt(params.id))),
          switchMap((params: Params) => this.userService.getProfile(params.id))
        )
        .subscribe(
          (user: User) => {
            this.user = user;
          },
          (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.router.navigate(['/404']);
            }
            else console.log(err);
          }
        )
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
