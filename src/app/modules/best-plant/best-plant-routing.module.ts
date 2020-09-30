import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BestPlantComponent } from './pages/best-plant/best-plant.component';

const routes: Routes = [
  { path: '', component: BestPlantComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BestPlantRoutingModule { }
