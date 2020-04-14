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

@NgModule({
  declarations: [EventFormComponent, CreateEventComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventRoutingModule
  ],
  providers: [
    EventService,
    UtilsService
  ]
})
export class EventModule { }
