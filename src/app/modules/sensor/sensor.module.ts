import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorRoutingModule } from './sensor-routing.module';
import { SensorHomeComponent } from './pages/sensor-home/sensor-home.component';

@NgModule({
  declarations: [SensorHomeComponent],
  imports: [
    CommonModule,
    SensorRoutingModule,
  ]
})
export class SensorModule { }
