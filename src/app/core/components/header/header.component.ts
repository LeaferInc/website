import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'src/app/shared/models/user/user';
import { UserAuth } from 'src/app/shared/models/auth/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentUser: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService
      .getUserAuth()
      .subscribe((userAuth: UserAuth) => {
        this.currentUser = userAuth.user;
      })
  }

}
