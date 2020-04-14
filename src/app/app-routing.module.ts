import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule) },
  { path: 'event', loadChildren: () => import('src/app/modules/event/event.module').then(m => m.EventModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
