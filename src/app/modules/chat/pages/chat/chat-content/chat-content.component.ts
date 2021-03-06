import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Message, CreateMessage } from 'src/app/shared/models/message/message';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/shared/models/user/user';
import { ChatSocketService } from 'src/app/core/services/chat-socket/chat-socket.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
})
export class ChatContentComponent implements OnInit, OnDestroy {
  messages: Message[];

  public messageInput = new FormControl('');

  public messageForm = new FormGroup({
    messageInput: this.messageInput,
  });

  currentUser: User;
  roomId: number;
  /***
   * TODO: REGLER LE PROBLEME DE SUBSCRIPTION
   */
  private sub: Subscription = new Subscription();

  constructor(
    public activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private chatSocketService: ChatSocketService
  ) {}

  ngOnInit(): void {
    this.sub.add(this.authService.getUserAuth().subscribe((userAuth) => (this.currentUser = userAuth?.user)));

    this.sub.add(
      this.activatedRoute.params
        .pipe(
          filter((routes) => routes.roomId),
          tap((routes) => {
            if (this.roomId) {
              this.sub.add(
                this.chatSocketService
                  .emit('leaveRoom', this.roomId)
                  .subscribe((message) => console.log('[Client]', message))
              );
            }
          }),
          tap((routes) => {
            this.roomId = routes.roomId;
            this.sub.add(this.chatSocketService.emit('joinRoom', Number(routes.roomId)).subscribe());
            this.sub.add(
              this.messageService.findConversation(routes.roomId).subscribe((messages) => (this.messages = messages))
            );
          })
        )
        .subscribe((routes) => {})
    );

    this.sub.add(
      this.chatSocketService.on('messageServerToClient').subscribe((message: Message) => {
        this.messages.push(message);
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmitMessage() {
    if (this.messageForm.invalid) {
      return;
    }

    let message = new CreateMessage();
    message.roomId = Number(this.roomId);
    message.messageContent = this.messageInput.value;

    this.messageForm.reset();

    this.sub.add(
      this.messageService.create(message).subscribe((message: Message) => console.log('[MESSAGE]', message))
    );
  }
}
