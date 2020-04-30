import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/user/user';
import { Message, CreateMessage } from 'src/app/shared/models/message/message';
import { MessageService } from 'src/app/core/services/message/message.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public users: User[];
  public messages: Message[];

  public messageInput = new FormControl('');

  public messageForm = new FormGroup({
    messageInput: this.messageInput
  });

  public receiverId: number;

  constructor(
    public activatedRoute: ActivatedRoute,
    public userService: UserService,
    public messageService: MessageService) { }

  ngOnInit(): void {
    this.userService
      .getTalkTo()
      .subscribe(users => this.users = users);

    this.activatedRoute
      .params
      .subscribe(routes => {
        if(routes.receiverId) {
          this.receiverId = routes.receiverId;
          this.messageService
            .findConversation(routes.receiverId)
            .subscribe(messages => this.messages = messages)
        }
      })
  }

  onSubmitMessage() {

    if(this.messageForm.invalid) {
      return;
    }

    let message = new CreateMessage();
    message.receiverId = this.receiverId;
    message.message_content = this.messageInput.value;

    this.messageForm.reset();

    this.messageService.create(message).subscribe(message => this.messages.push(message));
  }

}
