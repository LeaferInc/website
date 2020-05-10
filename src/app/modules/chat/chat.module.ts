import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatUserComponent } from './components/chat-user/chat-user.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatContentComponent } from './pages/chat/chat-content/chat-content.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

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
    ReactiveFormsModule,
    NzFormModule,
    NzCardModule,
    NzGridModule,
    NzIconModule.forChild([]),
    NzListModule,
    NzAvatarModule,
    NzSpaceModule,
    NzButtonModule,
    NzInputModule
  ]
})
export class ChatModule { }
