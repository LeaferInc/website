import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationItemComponent } from './notification-item.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [NotificationItemComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzTypographyModule,
    NzIconModule,
  ],
  exports: [
    NotificationItemComponent
  ]
})
export class NotificationItemModule { }
