import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Message, CreateMessage } from 'src/app/shared/models/message/message';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/shared/models/user/user';
import { SocketioService } from 'src/app/core/services/socketio/socketio.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message/message.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
})
export class ChatContentComponent implements OnInit {
  messages: Message[];

  public messageInput = new FormControl('');

  public messageForm = new FormGroup({
    messageInput: this.messageInput,
  });

  currentUser: User;
  roomId: number;

  constructor(
    public activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private socketService: SocketioService
  ) {}

  ngOnInit(): void {
    this.authService.getUserAuth().subscribe((userAuth) => (this.currentUser = userAuth.user));

    this.activatedRoute.params.subscribe((routes) => {
      if (routes.roomId) {
        this.roomId = routes.roomId;
        this.socketService.emit('joinRoom', Number(routes.roomId)).subscribe();
        this.messageService.findConversation(routes.roomId).subscribe((messages) => (this.messages = messages));
      }
    });

    this.socketService.on('messageServerToClient').subscribe((message: Message) => {
      console.log('[Client]', message);
      this.messages.push(message);
    });
  }

  onSubmitMessage() {
    if (this.messageForm.invalid) {
      return;
    }

    let message = new CreateMessage();
    message.roomId = Number(this.roomId);
    message.messageContent = this.messageInput.value;

    this.messageForm.reset();

    this.socketService.emit('messageClientToServer', message).subscribe((message: any) => console.log('[ACK]', message));
  }
}
