import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorHomeComponent } from './pages/sensor-home/sensor-home.component';


const routes: Routes = [
  {
    path: '',
    component: SensorHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorRoutingModule { }
