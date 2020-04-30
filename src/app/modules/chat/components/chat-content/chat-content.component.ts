import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/shared/models/message/message';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit {

  @Input() messages: Message[];

  currentUser: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService
      .getUserAuth()
      .subscribe(userAuth => this.currentUser = userAuth.user);
  }

}
