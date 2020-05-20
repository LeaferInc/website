import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuttingRoutingModule } from './cutting-routing.module';
import { CreateCuttingComponent } from './pages/create-cutting/create-cutting.component';
import { DetailsCuttingComponent } from './pages/details-cutting/details-cutting.component';
import { MyCuttingComponent } from './pages/my-cutting/my-cutting.component';
import { ListCuttingComponent } from './pages/list-cutting/list-cutting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyCuttingCardComponent } from './components/my-cutting-card/my-cutting-card.component';
import { ListCuttingCardComponent } from './components/list-cutting-card/list-cutting-card.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@NgModule({
  declarations: [
    CreateCuttingComponent,
    DetailsCuttingComponent,
    MyCuttingComponent,
    ListCuttingComponent,
    MyCuttingCardComponent,
    ListCuttingCardComponent,
  ],
  imports: [
    CommonModule,
    CuttingRoutingModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule.forChild([SearchOutline]),
    NzCardModule,
    NzTypographyModule,
    NzModalModule,
    NzPaginationModule
  ],
})
export class CuttingModule {}
