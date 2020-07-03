import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

const routes: Routes = [
  { path: 'me', component: ProfileComponent },
  { path: 'me/edit', component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
