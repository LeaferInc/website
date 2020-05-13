import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthenticateGuard } from './core/guards/authenticate/authenticate.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule) },
  { 
    path: 'events',
    canActivate: [ AuthenticateGuard ],
    loadChildren: () => import('src/app/modules/event/event.module').then((m) => m.EventModule) },
  {
    path: 'login',
    loadChildren: () => import('src/app/modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('src/app/modules/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'cutting',
    canActivate: [ AuthenticateGuard ],
    loadChildren: () => import('src/app/modules/cutting/cutting.module').then((m) => m.CuttingModule),
  },
  {
    path: 'chat',
    canActivate: [ AuthenticateGuard ],
    loadChildren: () => import('src/app/modules/chat/chat.module').then((m) => m.ChatModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
