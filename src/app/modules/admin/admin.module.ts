import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { UserListComponent } from './components/user-list/user-list.component';
import { CuttingListComponent } from './components/cutting-list/cutting-list.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { EventService } from 'src/app/core/services/event/event.service';

@NgModule({
  declarations: [AdminHomeComponent, UserListComponent, CuttingListComponent, PlantListComponent, EventListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzGridModule,
    NzStatisticModule,
    NzTabsModule,
    NzTableModule,
    NzTypographyModule,
    NzPopconfirmModule,
  ],
  providers: [
    EventService
  ]
})
export class AdminModule {}
