import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule) },
  { path: 'events', loadChildren: () => import('src/app/modules/event/event.module').then(m => m.EventModule) },
  { 
    path: 'login',
    loadChildren: () => import('src/app/modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('src/app/modules/register/register.module').then(m => m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
