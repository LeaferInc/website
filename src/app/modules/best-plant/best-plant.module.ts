import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestPlantComponent } from './pages/best-plant/best-plant.component';
import { BestPlantRoutingModule } from './best-plant-routing.module';
import { BestPlantService } from 'src/app/core/services/best-plant/best-plant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  declarations: [BestPlantComponent],
  imports: [
    CommonModule,
    BestPlantRoutingModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzGridModule,
    NzSelectModule,
    NzButtonModule,
    NzFormModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzInputModule,
  ],
  providers: [BestPlantService]
})
export class BestPlantModule { }
