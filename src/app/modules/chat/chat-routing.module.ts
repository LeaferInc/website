import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatContentComponent } from './pages/chat/chat-content/chat-content.component';

const routes: Routes = [
  { 
    path: '', component: ChatComponent,
    children: [
      { 
        path: ':roomId', component: ChatContentComponent 
      }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
