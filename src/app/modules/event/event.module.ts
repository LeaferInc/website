/**
 * @author ddaninthe
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EventFormComponent } from './components/event-form/create-event-form.component';
import { EventService } from 'src/app/core/services/event/event.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { EventRoutingModule } from './event-routing.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [EventFormComponent, CreateEventComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventRoutingModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzInputNumberModule,
    NzDatePickerModule
  ],
  providers: [
    EventService,
    UtilsService
  ]
})
export class EventModule { }
