import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantRoutingModule } from './plant-routing.module';
import { CreatePlantComponent } from './pages/create-plant/create-plant.component';
import { DetailsPlantComponent } from './pages/details-plant/details-plant.component';
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
import { CommunityPlantComponent } from './pages/community-plant/community-plant.component';
import { ManagePlantComponent } from './pages/manage-plant/manage-plant.component';
import { MyGardenComponent } from './pages/my-garden/my-garden.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ImagePickerModule } from 'src/app/shared/components/image-picker/image-picker.module';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    CreatePlantComponent,
    DetailsPlantComponent,
    PlantCardComponent,
    CommunityPlantComponent,
    ManagePlantComponent,
    MyGardenComponent,
  ],
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
    NzMessageModule,
    NzPaginationModule,
    NzCardModule,
    NzDropDownModule,
    ImagePickerModule,
  ],
})
export class PlantModule {}
