import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PremiumHomeComponent } from './pages/premium-home/premium-home.component';

const routes: Routes = [
  { path: '', component: PremiumHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumRoutingModule { }
