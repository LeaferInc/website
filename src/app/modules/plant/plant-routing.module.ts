import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlantComponent } from './pages/create-plant/create-plant.component';
import { ListPlantComponent } from './pages/list-plant/list-plant.component';
import { DetailsPlantComponent } from './pages/details-plant/details-plant.component';

const routes: Routes = [
  { path: 'create', component: CreatePlantComponent },
  { path: 'list', component: ListPlantComponent },
  { path: ':id', component: DetailsPlantComponent },
  { path: '', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantRoutingModule { }
