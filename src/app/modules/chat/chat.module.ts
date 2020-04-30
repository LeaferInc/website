import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatUserComponent } from './components/chat-user/chat-user.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatContentComponent } from './components/chat-content/chat-content.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatComponent,
    ChatUserComponent,
    ChatMessageComponent,
    ChatContentComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }
