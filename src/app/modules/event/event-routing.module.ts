import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from './pages/create-event/create-event.component';

const routes: Routes = [
  { path: '', component: CreateEventComponent },
  { path: 'create', component: CreateEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
