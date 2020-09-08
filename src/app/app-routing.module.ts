import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AboutComponent } from './shared/components/about/about.component';
import { AuthenticateGuard } from './core/guards/authenticate/authenticate.guard';
import { NotAuthenticateGuard } from './core/guards/not-authenticate/not-authenticate.guard';
import { AdminGuard } from './core/guards/admin/admin.guard';

const routes: Routes = [
  { 
    path: '',
    canActivate: [AuthenticateGuard],
    loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'chat',
    canActivate: [AuthenticateGuard],
    loadChildren: () => import('src/app/modules/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'cutting',
    canActivate: [AuthenticateGuard],
    loadChildren: () => import('src/app/modules/cutting/cutting.module').then((m) => m.CuttingModule),
  },
  {
    path: 'events',
    canActivate: [AuthenticateGuard],
    loadChildren: () => import('src/app/modules/event/event.module').then((m) => m.EventModule)
  },
  {
    path: 'login',
    canActivate: [NotAuthenticateGuard],
    loadChildren: () => import('src/app/modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'identify',
    canActivate: [AuthenticateGuard],
    loadChildren: () => import('src/app/modules/recognition/recognition.module').then((m) => m.RecognitionModule),
  },
  {
    path: 'register',
    canActivate: [NotAuthenticateGuard],
    loadChildren: () => import('src/app/modules/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'users',
    canActivate: [AuthenticateGuard],
    loadChildren: () => import('src/app/modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'plant',
    canActivate: [AuthenticateGuard],
    loadChildren: () => import('src/app/modules/plant/plant.module').then(m => m.PlantModule),
  },
  {
    path: 'admin',
    canActivate: [AuthenticateGuard, AdminGuard],
    loadChildren: () => import('src/app/modules/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'premium',
    canActivate: [AuthenticateGuard],
    loadChildren: () => import('src/app/modules/premium/premium.module').then(m => m.PremiumModule),
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
