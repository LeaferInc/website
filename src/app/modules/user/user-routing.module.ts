import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './pages/my-profile/my.profile.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: 'me', component: MyProfileComponent },
  { path: 'me/edit', component: UserEditComponent },
  { path: ':id', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
