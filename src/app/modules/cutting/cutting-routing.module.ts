import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCuttingComponent } from './pages/create-cutting/create-cutting.component';
import { MyCuttingComponent } from './pages/my-cutting/my-cutting.component';
import { DetailsCuttingComponent } from './pages/details-cutting/details-cutting.component';
import { ListCuttingComponent } from './pages/list-cutting/list-cutting.component';
import { MessagingCuttingComponent } from './pages/messaging-cutting/messaging-cutting.component';

const routes: Routes = [
  { path: 'create', component: CreateCuttingComponent },
  { path: 'inventory', component: MyCuttingComponent },
  { path: 'exchange', component: ListCuttingComponent },
  { path: 'messaging', component: MessagingCuttingComponent },
  { path: ':id', component: DetailsCuttingComponent },
  { path: '', redirectTo: 'exchange' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuttingRoutingModule { }
