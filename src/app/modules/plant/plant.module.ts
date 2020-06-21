import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantRoutingModule } from './plant-routing.module';
import { CreatePlantComponent } from './pages/create-plant/create-plant.component';
import { DetailsPlantComponent } from './pages/details-plant/details-plant.component';
import { ListPlantComponent } from './pages/list-plant/list-plant.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PlantCardComponent } from './components/plant-card/plant-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [CreatePlantComponent, DetailsPlantComponent, ListPlantComponent, PlantCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlantRoutingModule,
    NzGridModule,
    NzSelectModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    NzTypographyModule,
    NzAffixModule,
    NzInputNumberModule,
    NzButtonModule,
    NzEmptyModule,
    NzSpinModule,
    NzPaginationModule,
    NzCardModule,
  ]
})
export class PlantModule { }
