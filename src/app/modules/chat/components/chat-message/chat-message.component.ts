import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/shared/models/message/message';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;
  @Input() leftIcon: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
