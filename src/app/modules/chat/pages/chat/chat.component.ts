import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/models/user/user';
import { Message, CreateMessage } from 'src/app/shared/models/message/message';
import { MessageService } from 'src/app/core/services/message/message.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatSocketService } from 'src/app/core/services/chat-socket/chat-socket.service';
import { AppService } from 'src/app/core/services/app/app.service';
import { merge, pipe, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public users: User[];

  public roomId: number;

  private sub: Subscription = new Subscription();

  constructor(
    public activatedRoute: ActivatedRoute,
    private userService: UserService,
    private chatSocketService: ChatSocketService,
    private appService: AppService,
    private router: Router
  ) {
    this.appService.setFullHeigh(true);
  }

  ngOnInit(): void {
    this.sub.add(this.userService.getTalkTo().subscribe((users) => (this.users = users)));

    this.sub.add(
      this.activatedRoute.params.subscribe((routes) => {
        if (routes.roomId) {
          this.roomId = routes.roomId;
        }
      })
    );

    this.sub.add(
      this.chatSocketService
        .init()
        .pipe(
          switchMap(() =>
            merge(
              this.chatSocketService.on('init'),
              this.chatSocketService.on('disconnect'),
              this.chatSocketService.on('roomJoined'),
              this.chatSocketService.on('roomLeft')
            )
          )
        )
        .subscribe((message) => {
          console.log('[Client]', message);
        })
    );
  }

  ngOnDestroy(): void {
    this.appService.setFullHeigh(false);
    this.chatSocketService.disconnect();
    this.sub.unsubscribe();
  }

  onCuttingClicked(ev: Event) {
    ev.stopPropagation();
    this.router.navigate(['cutting']);
  }
}
