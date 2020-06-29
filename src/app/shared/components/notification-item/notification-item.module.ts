import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationItemComponent } from './notification-item.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@NgModule({
  declarations: [NotificationItemComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzTypographyModule
  ],
  exports: [
    NotificationItemComponent
  ]
})
export class NotificationItemModule { }
