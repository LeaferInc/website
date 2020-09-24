import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'src/app/shared/models/user/user';
import { UserAuth } from 'src/app/shared/models/auth/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currentUser: User;
  private sub: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.sub.add(
      this.authService.getUserAuth().subscribe((userAuth: UserAuth) => {
        this.currentUser = userAuth.user;
      })
    );
  }

  ngOnDestroy() {}
}
