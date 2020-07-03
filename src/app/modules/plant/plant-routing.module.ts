import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlantComponent } from './pages/create-plant/create-plant.component';
import { DetailsPlantComponent } from './pages/details-plant/details-plant.component';
import { ManagePlantComponent } from './pages/manage-plant/manage-plant.component';
import { CommunityPlantComponent } from './pages/community-plant/community-plant.component';
import { MyGardenComponent } from './pages/my-garden/my-garden.component';

const routes: Routes = [
  { path: 'create', component: CreatePlantComponent },
  { path: 'community', component: CommunityPlantComponent },
  { path: 'manage', component: ManagePlantComponent },
  { path: 'garden', component: MyGardenComponent },
  { path: ':id', component: DetailsPlantComponent },
  { path: '', redirectTo: 'community' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantRoutingModule { }
